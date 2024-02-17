import { useCallback, useEffect, useMemo, useState } from 'react';

import { Masonry } from '@/components/masonry';
import { ModeToggle } from '@/components/mode-toggle';
import { getBookmarkItems } from '@/utilities/bookmarks/get-bookmarks';
import { Folder } from '@/utilities/bookmarks/types';

import { BookmarksFolder } from './bookmark-folder';

export const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Map<string, Folder>>(new Map());
  const getBookmark = useCallback(async (): Promise<Map<string, Folder>> => {
    return await getBookmarkItems();
  }, []);

  useEffect(() => {
    const updateBookmarks = async () => {
      const result = await getBookmark();
      setBookmarks(result);
    };

    const handleBookmarkUpdate = () => {
      updateBookmarks();
    };

    updateBookmarks();
    chrome.bookmarks.onCreated.addListener(handleBookmarkUpdate);
    chrome.bookmarks.onChanged.addListener(handleBookmarkUpdate);
    chrome.bookmarks.onMoved.addListener(handleBookmarkUpdate);
    chrome.bookmarks.onRemoved.addListener(handleBookmarkUpdate);
    chrome.bookmarks.onChildrenReordered.addListener(handleBookmarkUpdate);

    return () => {
      chrome.bookmarks.onCreated.removeListener(handleBookmarkUpdate);
      chrome.bookmarks.onChanged.removeListener(handleBookmarkUpdate);
      chrome.bookmarks.onMoved.removeListener(handleBookmarkUpdate);
      chrome.bookmarks.onRemoved.removeListener(handleBookmarkUpdate);
      chrome.bookmarks.onChildrenReordered.removeListener(handleBookmarkUpdate);
    };
  }, [getBookmark]);

  const options = useMemo(
    () => ({
      columns: 8,
      margin: { x: 15, y: 15 },
      breakAt: Object.fromEntries(
        // 8K: 7680px
        Array.from({ length: Math.floor(7680 / 240) }, (_, i) => [
          (i + 1) * 240,
          Math.max(1, i),
        ]),
      ),
      useContainerForBreakpoints: true,
    }),
    [],
  );

  return (
    <main className="box-border h-full w-[calc(100%-3rem)] p-2 mx-12 flex-1 fixed overflow-y-auto bg-secondary">
      <div className="p-6 mx-2 my-4 flex flex-col gap-2 z-20 right-5 fixed bg-purple-300/30 backdrop-blur-[1px]">
        <span>Debug Options</span>
        <ModeToggle />
      </div>
      <Masonry options={options}>
        {Array.from(bookmarks.values()).map(folder => {
          return <BookmarksFolder key={folder.id} folder={folder} />;
        })}
      </Masonry>
    </main>
  );
};

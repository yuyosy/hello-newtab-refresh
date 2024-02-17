import { useCallback, useEffect, useMemo, useState } from 'react';

import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';

import { Masonry } from '@/components/masonry';
import { ModeToggle } from '@/components/mode-toggle';
import { Card } from '@/components/ui/card';
import { getBookmarkItems } from '@/utilities/bookmarks/get-bookmarks';
import { Folder } from '@/utilities/bookmarks/types';

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
    <main className="h-full w-full p-2 flex-1 overflow-y-auto bg-secondary">
      <div className="p-6 mx-2 my-4 flex flex-col gap-2 z-20 right-5 fixed bg-purple-300/30 backdrop-blur-[1px]">
        <span>Debug Options</span>
        <ModeToggle />
      </div>
      <Masonry options={options}>
        {Array.from(bookmarks.values()).map(folder => {
          return (
            <Card
              key={folder.id}
              className="p-2 bg-background/60 transition-all ease-in-out duration-300"
            >
              <div className="text-base">{folder.title}</div>
              <div className="flex flex-col gap-[.3rem]">
                {folder.bookmarks.map(bookmark => (
                  <a key={bookmark.id} href={bookmark.url} className="hover:bg-accent">
                    <div className="p-1.5 flex items-center gap-1">
                      {/* <img src={bookmark.faviconUrl} className="h-5 w-5 shrink-0" /> */}
                      <Avatar className="flex items-center justify-center h-5 w-5 shrink-0">
                        <AvatarImage src={bookmark.faviconUrl} />
                        <AvatarFallback
                          className="overflow-hidden text-nowrap text-ellipsis"
                          style={{
                            color: `hsl(${bookmark.color},80%,60%,100%)`,
                          }}
                        >
                          <span className="font-bold text-sm uppercase">
                            {bookmark.title.charAt(0)}
                          </span>
                          <span className="font-bold">{bookmark.title.charAt(1)}</span>
                        </AvatarFallback>
                      </Avatar>
                      <span className="overflow-hidden text-nowrap text-ellipsis">
                        {bookmark.title}
                      </span>
                    </div>
                  </a>
                  // </div>
                ))}
              </div>
              <div className="text-muted-foreground">
                {folder.bookmarks.length} bookemark
                {folder.bookmarks.length === 1 ? '' : 's'}
              </div>
            </Card>
          );
        })}
      </Masonry>
    </main>
  );
};

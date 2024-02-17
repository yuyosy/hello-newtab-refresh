import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Card } from '@radix-ui/themes';

import { Folder } from '@/utilities/bookmarks/types';

interface BookmarksFolderProps {
  folder: Folder;
}

export const BookmarksFolder = ({ folder }: BookmarksFolderProps) => {
  return (
    <Card
      key={folder.id}
      className="p-2 rounded-lg border bg-background transition-all ease-in-out duration-300"
    >
      <div className="text-base">{folder.title}</div>
      <div className="flex flex-col gap-[.3rem]">
        {folder.bookmarks.map(bookmark => (
          <a
            key={bookmark.id}
            href={bookmark.url}
            className="rounded-md hover:bg-primary/10"
          >
            <div className="p-1.5 flex items-center gap-1">
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
        ))}
      </div>
      <div className="px-1.5 text-muted-foreground">
        {folder.bookmarks.length} bookemark
        {folder.bookmarks.length === 1 ? '' : 's'}
      </div>
    </Card>
  );
};

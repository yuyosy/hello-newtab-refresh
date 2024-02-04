export type BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;
export type BookmarkTreeNodes = BookmarkTreeNode[];

export interface NodeInfo {
  title: string;
  id: string;
}

export interface Bookmark {
  index?: number;
  title: string;
  url: string;
  id: string;
  parentId?: string | undefined;
  faviconUrl: string;
}

export interface Folder {
  index?: number | undefined;
  title: string;
  id: string;
  parentId?: string | undefined;
  bookmarks: Bookmark[];
  path: NodeInfo[];
  visible: boolean;
}

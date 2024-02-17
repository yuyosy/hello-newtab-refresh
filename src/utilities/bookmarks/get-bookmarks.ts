import { colorHashString } from '@/utilities/color-hash';

import {
  Bookmark,
  BookmarkTreeNode,
  BookmarkTreeNodes,
  Folder,
  NodeInfo,
} from './types';

export const getTree = async (): Promise<BookmarkTreeNodes> => {
  const nodes = await chrome.bookmarks.getTree();
  return nodes;
};

export const searchBookmarks = async (words: string): Promise<Bookmark[]> => {
  const results: Bookmark[] = [];
  const nodes = await chrome.bookmarks.search(words);
  nodes.forEach(node => {
    if (node.url) {
      results.push(createBookmark(node));
    }
  });
  return results;
};

const getFaviconUrl = (url: string | undefined, size: number = 16) => {
  const faviconUrl = new URL(chrome.runtime.getURL('/_favicon/'));
  faviconUrl.searchParams.set('pageUrl', url ? url : '');
  faviconUrl.searchParams.set('size', String(size));
  return faviconUrl.toString();
};

const createBookmark = (node: BookmarkTreeNode): Bookmark => {
  const bookmark: Bookmark = {
    id: node.id,
    index: node.index ? node.index : 0,
    title: node.title,
    url: node.url ? node.url : '',
    faviconUrl: getFaviconUrl(node.url),
    parentId: node.parentId ? node.parentId : '',
    color: colorHashString(node.title),
  };
  return bookmark;
};

const createFolder = (node: BookmarkTreeNode, parentPath: NodeInfo[]) => {
  const folder: Folder = {
    id: node.id,
    index: node.index ? node.index : 0,
    title: node.title,
    path: parentPath,
    visible: true, // TODO
    bookmarks: [],
  };
  return folder;
};

const walk = (
  nodes: BookmarkTreeNodes,
  path: NodeInfo[],
  flattenedFolders: Map<string, Folder>,
) => {
  nodes.forEach(node => {
    if (node.children && node.children.length === 0) {
      return;
    }
    if (node.children) {
      flattenedFolders.set(node.id, createFolder(node, path));
      walk(
        node.children,
        [...path, { id: node.id, title: node.title }],
        flattenedFolders,
      );
    } else {
      if (node.parentId) {
        const parentNode = flattenedFolders.get(node.parentId);
        parentNode?.bookmarks.push(createBookmark(node));
      }
    }
  });
};

export const getBookmarkItems = async (): Promise<Map<string, Folder>> => {
  console.log('getBookmarkItems');
  const flattened: Map<string, Folder> = new Map();
  const nodes = await getTree();

  nodes.forEach(topLevelGroup => {
    if (topLevelGroup.children) {
      walk(topLevelGroup.children, [], flattened);
    }
  });
  return flattened;
};

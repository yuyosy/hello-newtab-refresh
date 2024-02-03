import { Mutex } from '@/utilities/mutex';
import { StorageContent, StorageKey, StoragePartialItems } from './default-storage';
import { SyncStorage } from 'jotai/vanilla/utils/atomWithStorage';

const mutex = new Mutex();

export const loadStorage = (
  keys?: StoragePartialItems | null,
): Promise<StoragePartialItems> => {
  return mutex.lock(() => chrome.storage.local.get(keys));
};

export const saveStorage = (items: StoragePartialItems): Promise<void> => {
  return mutex.lock(() => chrome.storage.local.set(items));
};

export const removeStorage = (keys: StorageKey | StorageKey[]): Promise<void> => {
  return mutex.lock(() => chrome.storage.local.remove(keys));
};

export const loadAndSetStorage = async (newStorage: StorageContent) => {
  const currentStorage = await loadStorage();
  const mergedStorage = { ...currentStorage, ...newStorage };
  return await saveStorage(mergedStorage);
};

// Implemented according to Interface SyncStorage of Jotai.
export const browserStorageLocal: SyncStorage<any> = {
  getItem: (key: string, initialValue: any): PromiseLike<StorageContent> => {
    return new Promise((resolve, _reject) => {
      loadStorage({ [key]: initialValue }).then(result => {
        if (Object.keys(result).length === 0) {
          resolve(initialValue);
        } else {
          resolve(result[key]);
        }
      });
    });
  },

  setItem: (key: string, newValue: any): PromiseLike<void> => {
    return saveStorage({ [key]: newValue });
  },

  removeItem: (key: string): PromiseLike<void> => {
    return removeStorage(key);
  },

  subscribe: (
    key: string,
    callback: (value: any) => void,
    initialValue: any,
  ): (() => void) => {
    console.log('subscribe');
    const listener = function (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) {
      if (changes.hasOwnProperty(key)) {
        callback(changes[key].newValue);
      } else {
        callback(initialValue);
      }
    };
    chrome.storage.local.onChanged.addListener(listener);
    return () => {
      chrome.storage.local.onChanged.removeListener(listener);
    };
  },
};

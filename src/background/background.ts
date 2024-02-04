import { defaultStorageItems } from '@/storage/default-storage';
import { loadAndSetStorage } from '@/storage/local-storage';

console.log('Hello background!');
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
  loadAndSetStorage(defaultStorageItems);
  console.log('initialized');
});

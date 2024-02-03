import { manifest } from '@/manifest';
import { ThemeMode } from '@/registry/mode';
import { Style } from '@/registry/styles';
import { Theme } from '@/registry/themes';
import { VersionString } from '@/utilities/version';

export interface ThemeConfig {
  radius: number;
}
export interface StorageItems {
  extensionVersion: string;
  formatVersion: string;
  optionsThemeStyle: Style['name'];
  optionsThemeColor: Theme['name'];
  optionsThemeMode: ThemeMode;
  optionsThemeConfig: ThemeConfig;
}

export type StorageContent = Partial<StorageItems> & { [key: string]: any };
export type StoragePartialItems = Partial<StorageContent>;
export type StorageKey = Extract<keyof StorageContent, string>;

export const defaultStorageItems: { [key: string]: any } = {
  extensionVersion: manifest.version as VersionString,
  formatVersion: '1.0' as VersionString,
  optionsThemeStyle: 'default',
  optionsThemeColor: 'zinc',
  optionsThemeMode: 'light',
  optionsThemeConfig: {
    radius: 0.3,
  },
};

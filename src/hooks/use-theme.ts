import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { ThemeMode } from '@/registry/mode';
import { Style } from '@/registry/styles';
import { Theme } from '@/registry/themes';
import { ThemeConfig, defaultStorageItems } from '@/storage/default-storage';
import { browserStorageLocal } from '@/storage/local-storage';

const themeStyleAtom = atomWithStorage<Style['name']>(
  'optionsThemeStyle',
  defaultStorageItems.optionsThemeStyle,
  browserStorageLocal,
  // { getOnInit: true },
);

const themeColorAtom = atomWithStorage<Theme['name']>(
  'optionsThemeColor',
  defaultStorageItems.optionsThemeColor,
  browserStorageLocal,
  // { getOnInit: true },
);

const themeModeAtom = atomWithStorage<ThemeMode>(
  'optionsThemeMode',
  defaultStorageItems.optionsThemeMode,
  // browserStorageLocal,
  // { getOnInit: true },
);

const themeConfigAtom = atomWithStorage<ThemeConfig>(
  'optionsThemeConfig',
  defaultStorageItems.optionsThemeConfig,
  browserStorageLocal,
  // { getOnInit: true },
);

export const useThemeStyle = () => {
  return useAtom(themeStyleAtom);
};

export const useThemeColor = () => {
  return useAtom(themeColorAtom);
};

export const useThemeMode = () => {
  return useAtom(themeModeAtom);
};

export const useThemeConfig = () => {
  return useAtom(themeConfigAtom);
};

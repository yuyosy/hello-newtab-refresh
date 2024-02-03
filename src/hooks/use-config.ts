// This code has been directly copied from shadcn-ui/ui

// shadcn-ui/ui
// https://github.com/shadcn-ui/ui
//
// MIT License
// Copyright (c) 2023 shadcn
// https://github.com/shadcn-ui/ui/blob/main/LICENSE.md
//
// apps/www/hooks/use-config.ts
//

import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { Style } from '@/registry/styles';
import { Theme } from '@/registry/themes';

type Config = {
  style: Style['name'];
  theme: Theme['name'];
  radius: number;
};

const configAtom = atomWithStorage<Config>('config', {
  style: 'default',
  theme: 'zinc',
  radius: 0.3,
});

export function useConfig() {
  return useAtom(configAtom);
}

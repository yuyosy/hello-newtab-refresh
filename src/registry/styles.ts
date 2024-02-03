// This implementation is heavily based on the code from shadcn-ui/ui

// shadcn-ui/ui
// https://github.com/shadcn-ui/ui
//
// MIT License
// Copyright (c) 2023 shadcn
// https://github.com/shadcn-ui/ui/blob/main/LICENSE.md
//
// apps/www/registry/styles.ts
//

export const styles = [
  {
    name: 'default',
    label: 'Default',
  },
] as const;

export type Style = (typeof styles)[number];

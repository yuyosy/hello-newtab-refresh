// This code has been directly copied from shadcn-ui/ui

// shadcn-ui/ui
// https://github.com/shadcn-ui/ui
//
// MIT License
// Copyright (c) 2023 shadcn
// https://github.com/shadcn-ui/ui/blob/main/LICENSE.md
//
// apps/www/components/theme-wrapper.tsx
//

import { cn } from '@/lib/utils';
import { useConfig } from '@/hooks/use-config';

interface ThemeWrapperProps extends React.ComponentProps<'div'> {
  defaultTheme?: string;
}

export function ThemeWrapper({ defaultTheme, children, className }: ThemeWrapperProps) {
  const [config] = useConfig();

  return (
    <div
      className={cn(`theme-${defaultTheme || config.theme}`, 'w-full', className)}
      style={
        {
          '--radius': `${defaultTheme ? 0.5 : config.radius}rem`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

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

import { useThemeConfig, useThemeColor } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';

interface ThemeWrapperProps extends React.ComponentProps<'div'> {
  defaultTheme?: string;
}

export function ThemeWrapper({ defaultTheme, children, className }: ThemeWrapperProps) {
  const [themeColor] = useThemeColor();
  const [themeConfig] = useThemeConfig();

  return (
    <div
      className={cn(`theme-${defaultTheme || themeColor}`, 'w-full', className)}
      style={
        {
          '--radius': `${themeConfig?.radius ? themeConfig.radius : 0.5}rem`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

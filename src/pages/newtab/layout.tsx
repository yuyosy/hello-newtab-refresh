import '@/css/global.css';
import '@/css/themes.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { ThemeWrapper } from '@/components/theme-wrapper';

import { AppearanceSettings } from './components/appearance-settings';
import { SearchCommand } from './components/search-command';
import Page from './page';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ThemeWrapper className="h-full">
        <SearchCommand />
        <AppearanceSettings />
        <Page />
      </ThemeWrapper>
    </ThemeProvider>
  </React.StrictMode>,
);

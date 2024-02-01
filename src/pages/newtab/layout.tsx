import React from 'react';
import ReactDOM from 'react-dom/client';
import { Theme } from '@radix-ui/themes';

import { ThemeProvider } from '@/components/providers/theme-provider';

import Page from './page';

import '@/css/global.css';
import { SearchCommand } from '@/components/search-command';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme asChild>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <SearchCommand />
        <Page />
      </ThemeProvider>
    </Theme>
  </React.StrictMode>,
);

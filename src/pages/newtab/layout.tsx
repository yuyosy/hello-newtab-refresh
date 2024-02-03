import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { SearchCommand } from '@/components/search-command';
import { ThemeWrapper } from '@/components/theme-wrapper';

import '@/css/global.css';
import '@/css/themes.css';

import Page from './page';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ThemeWrapper className="h-full">
        <SearchCommand />
        <Page />
      </ThemeWrapper>
    </ThemeProvider>
  </React.StrictMode>,
);

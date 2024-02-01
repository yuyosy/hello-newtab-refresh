import { ManifestV3 } from '@/@types/manifest';

export const manifest: ManifestV3 = {
  manifest_version: 3,
  name: 'Hello-NewTab-Refresh',
  version: '1.0.0',
  description: '__MSG_extensionDescription__',
  default_locale: 'en',
  incognito: 'split',
  permissions: ['bookmarks', 'storage'],
  chrome_url_overrides: {
    newtab: 'src/pages/newtab/index.html',
  },
  content_security_policy: {
    extension_pages: "script-src 'self'; object-src 'self'",
  },
  options_ui: {
    open_in_tab: true,
    page: 'src/pages/options/index.html',
  },
  background: {
    service_worker: 'src/background/background.ts',
    type: 'module',
  },
};

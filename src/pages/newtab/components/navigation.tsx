import { ElementRef, useRef, useState } from 'react';

import {
  Blocks,
  Bookmark,
  ChevronsLeft,
  ChevronsRight,
  Download,
  History,
  Palette,
  Search,
  Settings,
} from 'lucide-react';

import { useAppearanceModal } from '@/hooks/use-appearance-modal';
import { useSearchModal } from '@/hooks/use-search-modal';
import { cn } from '@/lib/utils';

import { NavigationItem } from './navigation-item';

export const Navigation = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const { open: searchOpen } = useSearchModal();
  const { open: appearanceOpen } = useAppearanceModal();

  const sidebarRef = useRef<ElementRef<'aside'>>(null);

  const collapse = () => {
    if (sidebarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);
      sidebarRef.current.style.width = '3rem';
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const expand = () => {
    if (sidebarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);
      sidebarRef.current.style.width = '15rem';
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        'group/sidebar h-full w-12 z-20 flex flex-col fixed overflow-y-auto border-r-[1px] bg-background dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700',
        isResetting && 'transition-all ease-in-out duration-300',
      )}
    >
      <div>
        <NavigationItem
          label="Navigation Menu"
          icon={isCollapsed ? ChevronsRight : ChevronsLeft}
          onClick={isCollapsed ? expand : collapse}
        />
        <NavigationItem
          label="Search"
          icon={Search}
          onClick={searchOpen}
          kbd={['Ctrl', 'B']}
        />
        <NavigationItem label="Bookmark" icon={Bookmark} />
        <NavigationItem label="History" icon={History} />
        <NavigationItem label="Download" icon={Download} />
        <NavigationItem label="Extensions" icon={Blocks} />
        <NavigationItem label="Appearance" icon={Palette} onClick={appearanceOpen} />
        <NavigationItem label="Settings" icon={Settings} />
      </div>
    </aside>
  );
};

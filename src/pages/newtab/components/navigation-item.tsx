import { ReactNode, useCallback } from 'react';

import { LucideIcon } from 'lucide-react';

interface NavigationItemProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  kbd?: string[];
}

export const NavigationItem = ({
  label,
  icon: Icon,
  onClick,
  kbd,
}: NavigationItemProps) => {
  const joinedString = useCallback(
    (kbdArray: string[]) =>
      kbdArray
        .map(element => (
          <kbd key={element} className="px-1 rounded border bg-muted">
            {element}
          </kbd>
        ))
        .reduce<ReactNode[]>((prev, curr) => {
          return [...prev, curr, '+'];
        }, [])
        .slice(0, -1),
    [kbd],
  );

  return (
    <div
      role="button"
      onClick={onClick}
      className="mx-1.5 my-2 p-1.5 flex items-center justify-between overflow-x-hidden whitespace-nowrap rounded text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-all ease-in-out duration-100"
    >
      <div className="flex items-center gap-x-2 text-base">
        <Icon strokeWidth={1.8} className=" h-6" />
        {label}
      </div>
      {kbd && (
        <kbd className="h-5 inline-flex items-center gap-1 text-[12px] text-muted-foreground font-mono select-none pointer-events-none">
          {joinedString(kbd)}
        </kbd>
      )}
    </div>
  );
};

import { LucideIcon } from 'lucide-react';

interface NavigationItemProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export const NavigationItem = ({ label, icon: Icon, onClick }: NavigationItemProps) => {
  return (
    <div
      role="button"
      onClick={onClick}
      className="mx-1.5 my-2 p-1.5 flex items-center overflow-x-hidden whitespace-nowrap rounded text-muted-foreground hover:bg-neutral-200 dark:bg-neutral-600 transition-all ease-in-out duration-100"
    >
      <div className="flex items-center gap-x-2">
        <Icon strokeWidth={1.8} className=" h-6" />
        {label}
      </div>
    </div>
  );
};
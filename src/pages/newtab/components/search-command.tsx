import { useEffect } from 'react';

import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useSearchModal } from '@/hooks/use-search-modal';
import { cn } from '@/lib/utils';

const getState = (open: boolean) => {
  return open ? 'open' : 'closed';
};

export const SearchCommand = () => {
  const { isOpen, close, toggle } = useSearchModal();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'b' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // CommandDialog is not used due to the occurrence of the issue described in the following issue.
  //
  // refer to: https://github.com/radix-ui/primitives/issues/2356
  //
  return (
    <div
      onClick={close}
      data-state={getState(isOpen)}
      className={cn(
        'fixed h-full w-full hidden data-[state=open]:flex items-center justify-center z-[-100] data-[state=open]:z-[100] bg-background/20 backdrop-blur-[1.6px]',
      )}
    >
      <div className="flex flex-col w-1/2 max-w-lg gap-1">
        <div className="flex justify-end">
          <Button onClick={close} variant="outline" size="icon" className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div onClick={e => e.stopPropagation()}>
          <Command className="p-2 shadow-lg border">
            <CommandInput></CommandInput>
            <CommandList className="max-h-[300px]">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Bookmarks">
                <CommandItem>001</CommandItem>
                <CommandItem>002</CommandItem>
                <CommandItem>003</CommandItem>
                <CommandItem>004</CommandItem>
                <CommandItem>005</CommandItem>
                <CommandItem>006</CommandItem>
                <CommandItem>007</CommandItem>
                <CommandItem>008</CommandItem>
                <CommandItem>009</CommandItem>
                <CommandItem>010</CommandItem>
                <CommandItem>011</CommandItem>
                <CommandItem>012</CommandItem>
                <CommandItem>013</CommandItem>
                <CommandItem>014</CommandItem>
                <CommandItem>015</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>
    </div>
  );
};

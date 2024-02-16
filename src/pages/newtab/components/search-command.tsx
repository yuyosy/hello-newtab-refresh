import { useEffect, useRef, useState } from 'react';

import { CommandLoading } from 'cmdk';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useSearchModal } from '@/hooks/use-search-modal';
import { cn } from '@/lib/utils';
import { searchBookmarks } from '@/utilities/bookmarks/get-bookmarks';
import { BookmarkTreeNodes } from '@/utilities/bookmarks/types';

const getState = (open: boolean) => {
  return open ? 'open' : 'closed';
};

export const SearchCommand = () => {
  const { isOpen, close, toggle } = useSearchModal();
  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState<BookmarkTreeNodes>([]);

  const search = async () => {
    setLoading(true);
    const results = await searchBookmarks(inputValue);
    console.log(results);
    setSearchResults(results);
    setLoading(false);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'b' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        close();
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else {
      setInputValue('');
      inputRef.current?.blur();
    }
  }, [isOpen]);

  useEffect(() => {
    search();
  }, [inputValue]);

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
            <CommandInput
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              placeholder="Search Bookmarks"
            />
            <CommandList className="max-h-[300px]">
              <CommandEmpty>No results found.</CommandEmpty>
              {loading && <CommandLoading>Searching boorkmarks...</CommandLoading>}
              {searchResults.map(item => (
                <CommandItem key={item.id}>{item.title}</CommandItem>
              ))}
            </CommandList>
          </Command>
        </div>
      </div>
    </div>
  );
};

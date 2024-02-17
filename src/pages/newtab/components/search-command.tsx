import { useEffect, useRef, useState } from 'react';

import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
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
import { Bookmark } from '@/utilities/bookmarks/types';

const getState = (open: boolean) => {
  return open ? 'open' : 'closed';
};

export const SearchCommand = () => {
  const { isOpen, close, toggle } = useSearchModal();
  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState<Bookmark[]>([]);

  const search = async () => {
    setLoading(true);
    const results = await searchBookmarks(inputValue);
    // console.log(results);
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
    const delay = 500;
    let timeoutId: NodeJS.Timeout | null = null;

    const searchWithDelay = () => {
      timeoutId = setTimeout(() => {
        search();
      }, delay);
    };

    clearTimeout(timeoutId!);
    searchWithDelay();

    return () => {
      clearTimeout(timeoutId!);
    };
  }, [inputValue]);

  const handleChange = (value: string) => {
    setInputValue(value);
  };
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
      <div className="flex flex-col w-1/2 max-w-xl gap-1">
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
              onValueChange={handleChange}
              placeholder="Search Bookmarks"
            />
            <CommandList className="h-[300px]">
              <CommandEmpty>
                <span className="text-muted-foreground">
                  {inputValue === ''
                    ? 'Enter a keyword to start searching bookmarks.'
                    : 'No results found.'}
                </span>
              </CommandEmpty>
              {loading && (
                <CommandLoading className="flex items-center justify-center p-3">
                  Searching boorkmarks...
                </CommandLoading>
              )}

              {searchResults.map((bookmark: Bookmark) => (
                <CommandItem
                  key={bookmark.id}
                  value={`${bookmark.id}|${bookmark.title}|${bookmark.url}`}
                  className="m-1 rounded-sm flex flex-row gap-2"
                >
                  <div className="p-1.5 flex items-center gap-1">
                    <Avatar className="flex items-center justify-center h-8 w-8 shrink-0">
                      <AvatarImage src={bookmark.faviconUrl} />
                      <AvatarFallback
                        className="overflow-hidden text-nowrap text-ellipsis"
                        style={{
                          color: `hsl(${bookmark.color},80%,60%,100%)`,
                        }}
                      >
                        <span className="font-bold text-sm uppercase">
                          {bookmark.title.charAt(0)}
                        </span>
                        <span className="font-bold">{bookmark.title.charAt(1)}</span>
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="box-border overflow-hidden">
                    <div className="">{bookmark.title}</div>
                    <div className="overflow-hidden text-nowrap text-ellipsis text-xs text-muted-foreground">
                      {bookmark.url}
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandList>
            <div className="h-6 p-1 flex flex-col border-t">
              <div className="text-muted-foreground">
                {inputValue === ''
                  ? ''
                  : `${searchResults.length} bookmark${searchResults.length === 1 ? '' : 's'}`}
              </div>
            </div>
          </Command>
        </div>
      </div>
    </div>
  );
};

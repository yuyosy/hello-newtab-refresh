import React, { ElementRef, useRef } from 'react';

import { MacyOptions } from 'macy';

import { useMacy } from '@/hooks/use-macy';

interface MasonryProps {
  children: React.ReactNode;
  options: MacyOptions;
}

export const Masonry = ({ children, options }: MasonryProps) => {
  const containerRef = useRef<ElementRef<'div'>>(null);
  const childCount = React.Children.count(children);
  useMacy({ containerRef, options, childCount });

  return (
    <div ref={containerRef} className="transition-all ease-in-out duration-300">
      {children}
    </div>
  );
};

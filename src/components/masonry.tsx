import { useMacy } from '@/hooks/use-macy';
import { MacyOptions } from 'macy';
import React, { ElementRef, useRef } from 'react';

interface MasonryProps {
  children: React.ReactNode;
  options: MacyOptions;
}

export const Masonry = ({ children, options }: MasonryProps) => {
  const containerRef = useRef<ElementRef<'div'>>(null);
  const childCount = React.Children.count(children);
  useMacy({ containerRef, options, childCount });

  return <div ref={containerRef}>{children}</div>;
};

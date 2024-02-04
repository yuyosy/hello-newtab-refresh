import React, { useRef, useEffect } from 'react';

import { MacyOptions, default as Macy } from 'macy';

interface useMacyProps {
  containerRef: React.RefObject<HTMLElement>;
  options: MacyOptions;
  childCount: number;
}

export const useMacy = ({ containerRef, options, childCount }: useMacyProps) => {
  const macyRef = useRef<Macy>();

  useEffect(() => {
    const macyOptions: MacyOptions = {
      ...options,
      container: containerRef.current,
    };
    macyRef.current = new Macy(macyOptions);
    return () => {
      macyRef.current?.remove();
    };
  }, [options, containerRef]);

  useEffect(() => {
    macyRef.current?.reInit();
  }, [childCount]);

  return { macy: macyRef.current };
};

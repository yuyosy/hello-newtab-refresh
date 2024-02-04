import { useCallback } from 'react';

import { atom, useAtomValue, useSetAtom } from 'jotai';

const searchModalAtom = atom<boolean>(false);

export const useSearchModal = () => {
  const isOpen = useAtomValue(searchModalAtom);
  const setSearchModal = useSetAtom(searchModalAtom);

  const close = useCallback(() => {
    setSearchModal(false);
  }, [isOpen]);

  const open = useCallback(() => {
    setSearchModal(true);
  }, [isOpen]);

  const toggle = useCallback(() => {
    setSearchModal(isOpen => !isOpen);
  }, []);

  return { isOpen, setSearchModal, open, close, toggle };
};

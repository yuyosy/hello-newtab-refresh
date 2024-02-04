import { useCallback } from 'react';

import { atom, useAtomValue, useSetAtom } from 'jotai';

const appearanceModalAtom = atom<boolean>(false);

export const useAppearanceModal = () => {
  const isOpen = useAtomValue(appearanceModalAtom);
  const setAppearanceModal = useSetAtom(appearanceModalAtom);

  const close = useCallback(() => {
    setAppearanceModal(false);
  }, [isOpen]);

  const open = useCallback(() => {
    setAppearanceModal(true);
  }, [isOpen]);

  const toggle = useCallback(() => {
    setAppearanceModal(isOpen => !isOpen);
  }, []);

  return { isOpen, setAppearanceModal, open, close, toggle };
};

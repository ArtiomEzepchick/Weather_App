import { useCallback } from "react";

type ScrollLockType = {
  lockScroll: () => void;
  unlockScroll: () => void;
};

export const useScrollLock = (): ScrollLockType => {
  const lockScroll = useCallback((): void => {
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarCompensation}px`;
  }, []);

  const unlockScroll = useCallback((): void => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
};

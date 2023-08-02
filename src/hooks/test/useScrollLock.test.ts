import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { useScrollLock, ScrollLockType } from "../useScrollLock";

describe("useScrollLock", () => {
  let scrollLock: ScrollLockType;

  beforeEach(() => {
    scrollLock = renderHook(() => useScrollLock()).result.current;
  });

  it("should lock scroll", () => {
    act(() => {
      scrollLock.lockScroll();
    });

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("should unlock scroll", () => {
    // Lock scroll
    act(() => {
      scrollLock.lockScroll();
    });

    // Unlock scroll
    act(() => {
      scrollLock.unlockScroll();
    });

    expect(document.body.style.overflow).toBe("");
  });
});

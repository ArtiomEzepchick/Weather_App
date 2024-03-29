import React, { useRef, useEffect, useCallback, RefObject } from "react";
import { Button, InputRef } from "antd";
import { createPortal } from "react-dom";
import { Dispatch } from "redux";

import Overlay from "../Overlay/Overlay";

import { useScrollLock } from "../../hooks/useScrollLock";
import {
  clearError,
  setInputCityValue,
} from "../../model/weather/actions/actions";
import { closeModal } from "./closeModal";

import "./index.scss";

type Props = {
  dispatch: Dispatch;
  contentText: string;
  isModalOpen: boolean;
  inputRef: RefObject<InputRef>;
  isReturnToEditShow?: boolean;
};

const Modal: React.FC<Props> = ({
  dispatch,
  contentText,
  isModalOpen,
  inputRef,
  isReturnToEditShow = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { lockScroll, unlockScroll } = useScrollLock();
  const modalRoot = document.getElementById("modal") as HTMLElement;

  const handleCloseModal = useCallback((): void => {
    closeModal();

    setTimeout(() => {
      dispatch(clearError());
      unlockScroll();
    }, 200);
  }, [dispatch, unlockScroll]);

  const handleCloseModalAndEdit = useCallback((): void => {
    if (inputRef.current) inputRef.current.focus();

    closeModal();

    setTimeout(() => {
      dispatch(clearError());
      dispatch(setInputCityValue(""));
      unlockScroll();
    }, 200);
  }, [dispatch, inputRef, unlockScroll]);

  useEffect(() => {
    isModalOpen ? lockScroll() : unlockScroll();

    const handleClickOutside = (e: MouseEvent): void => {
      const target = e.target as HTMLDivElement;

      if (modalRef.current && !modalRef.current.contains(target)) {
        handleCloseModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [modalRef, isModalOpen, lockScroll, unlockScroll, handleCloseModal]);

  return createPortal(
    <Overlay isModalOpen={isModalOpen} data-testid="overlay">
      <div className="modal-container" data-testid="modalContainer">
        <div className="modal-window" ref={modalRef}>
          <section className="modal-content">
            <h2 data-testid="modalHeader">An error has occurred</h2>
            <p data-testid="modalContent">{contentText}</p>
          </section>
          <section className="modal-buttons">
            <Button onClick={handleCloseModal}>Ok</Button>
            {isReturnToEditShow && (
              <Button onClick={handleCloseModalAndEdit}>Return to edit</Button>
            )}
          </section>
        </div>
      </div>
    </Overlay>,
    modalRoot
  );
};

export default Modal;

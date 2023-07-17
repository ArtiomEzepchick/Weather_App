import React, { MouseEventHandler } from "react";

type Props = {
  menuLabel: string;
  handleDeleteBtnClick: MouseEventHandler<HTMLButtonElement>;
  isLoading: boolean;
};

const MenuItem: React.FC<Props> = ({
  menuLabel,
  handleDeleteBtnClick,
  isLoading,
}) => {
  return (
    <>
      <span>{menuLabel}</span>
      <button
        disabled={isLoading}
        className="menu-delete-btn"
        onClick={handleDeleteBtnClick}
        title="Delete"
        style={{ pointerEvents: `${isLoading ? "none" : "auto"}` }}
      >
        X
      </button>
    </>
  );
};

export default MenuItem;

import React from "react";
import { DOMAttributes, memo } from "react";

type CommonButtonProps = {
  href?: string;
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
  text: string;
  classNameText?: string;
  disabled?: boolean;
};

export const CommonButton = ({
  text,
  onClick,
  classNameText,
}: CommonButtonProps) => {
  return (
    <button
      type="submit"
      className={
        classNameText +
        `text-center my-1 text-white font-bold py-2 px-4 rounded`
      }
      onClick={onClick}
    >
      {text}
    </button>
  );
};

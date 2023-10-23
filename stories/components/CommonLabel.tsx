import React from "react";
import { DOMAttributes, memo } from "react";

type CommonLabelProps = {
  labelText: string;
  htmlfor: string;
  required?: boolean;
};

export const CommonLabel = ({
  labelText,
  htmlfor,
  required = false,
}: CommonLabelProps) => {
  return (
    <label htmlFor={htmlfor}>
      {labelText}
      {required && <span className="text-red-700">*</span>}
    </label>
  );
};

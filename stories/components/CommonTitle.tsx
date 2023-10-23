import React from "react";
import { DOMAttributes, memo } from "react";

type CommonButtonProps = {
  title: string;
};

export const CommonTitle = ({ title }: CommonButtonProps) => {
  return <h2 className="text-center text-2xl font-bold mb-6 mt-10">{title}</h2>;
};

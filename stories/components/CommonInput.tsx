import React from "react";
import { DOMAttributes } from "react";
import { useForm } from "react-hook-form";

type CommonInputProps = {
  href?: string;
  type: string;
  id: string;
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
  register: any;
};

export const CommonInput = ({ type, id, register }: CommonInputProps) => {
  return (
    <input
      type={type}
      id={id}
      {...register(id)}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
  );
};

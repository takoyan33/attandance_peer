import { Meta, StoryObj } from "@storybook/react";
import { CommonButton } from "./components/CommonButton";
const meta: Meta<typeof CommonButton> = {
  component: CommonButton,
  title: "CommonButton",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BlueButton: Story = {
  args: {
    text: "登録",
    classNameText: "bg-blue-500 hover:bg-blue-700",
  },
};

export const RedButton: Story = {
  args: {
    text: "取り消し",
    classNameText: "bg-red-500 hover:bg-red-700",
  },
};

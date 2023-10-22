import { Meta, StoryObj } from "@storybook/react";
import { CommonButton } from "./components/CommonButton";
const meta: Meta<typeof CommonButton> = {
  component: CommonButton,
  title: "共通のボタン(CommonButton)",
  tags: ["autodocs"],
  argTypes: {
    text: {
      description: "buttonの文字",
    },
    classNameText: {
      description: "ボタンの背景色",
    },
    href: {
      description: "URLのリンク先",
    },
    onClick: {
      description: "ボタンを押した時の処理",
    },
  },
  parameters: {
    componentSubtitle: "共通ボタンは、サイト内で使われるボタンです",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BlueButton: Story = {
  args: {
    text: "登録",
    classNameText: "bg-blue-500 hover:bg-blue-700",
  },
};

BlueButton.parameters = {
  docs: {
    storyDescription: "通常のボタンです",
  },
};

export const RedButton: Story = {
  args: {
    text: "取り消し",
    classNameText: "bg-red-500 hover:bg-red-700",
  },
};

import { Meta, StoryObj } from "@storybook/react";
import { CommonLabel } from "./components/CommonLabel";

const meta: Meta<typeof CommonLabel> = {
  component: CommonLabel,
  title: "共通のinputラベル(CommonLabel)",
  tags: ["autodocs"],
  argTypes: {
    labelText: {
      description: "ラベルの文字",
    },
    htmlfor: {
      description: "inputのhtmlfor",
    },
    required: {
      description: "必須かどうか",
    },
  },
  parameters: {
    componentSubtitle: "共通のinputラベル(CommonLabel)です",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/** 通常のメールアドレスのラベルです */
export const Label: Story = {
  args: {
    labelText: "メールアドレス",
    htmlfor: "email",
    required: false,
  },
};

/** 必須のメールアドレスのラベルです */
export const RequiredLabel: Story = {
  args: {
    labelText: "メールアドレス",
    htmlfor: "email",
    required: true,
  },
};

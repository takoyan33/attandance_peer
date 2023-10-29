import { Meta, StoryObj } from "@storybook/react";
import { CommonTitle } from "./components/CommonTitle";
const meta: Meta<typeof CommonTitle> = {
  component: CommonTitle,
  title: "共通のtitle(CommonTitle)",
  tags: ["autodocs"],
  argTypes: {
    title: {
      description: "タイトルの文字",
    },
  },
  parameters: {
    componentSubtitle: "共通のtitle(CommonTitle)です",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/** 通常のタイトル */
export const Title: Story = {
  args: {
    title: "タイトル",
  },
};
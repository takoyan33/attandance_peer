import { Meta } from "@storybook/react";
import { CommonHeader } from "./components/CommonHeader";
const meta: Meta<typeof CommonHeader> = {
  component: CommonHeader,
  title: "ヘッダー(CommonHeader)",
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "ヘッダーは、サイト内で使われるボタンです",
  },
};

export default meta;

export const BaseHeader = {};

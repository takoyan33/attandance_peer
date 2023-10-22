import { Meta } from "@storybook/react";
import Circle from "./Circle";

const meta: Meta<typeof Circle> = {
  component: Circle,
  title: "円",
  argTypes: {
    variant: {
      control: {
        type: "color",
      },
      options: ["orange", "green", "yellow"],
    },
  },
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "共通ボタンは、サイト内で使われるボタンです",
  },
};

export default meta;

export const BaseCircle = {
  args: {
    variant: "orange",
  },
};

export const GreenCircle = {
  args: {
    variant: "green",
  },
};

export const YellowCircle = {
  args: {
    variant: "yellow",
  },
};

import { Meta, StoryObj } from "@storybook/react";
import { MeetingStatus } from "./MeetingStatus";

const meta: Meta<typeof MeetingStatus> = {
  component: MeetingStatus,
  title: "MeetingStatus",
  tags: ["autodocs"],
  argTypes: {
    meetingDate: {
      description: "会議の日にち",
    },
    target: {
      description: "締切日",
    },
  },
  parameters: {
    componentSubtitle: "ヘッダーは、サイト内で使われるボタンです",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BeforeStatus: Story = {
  args: {
    meetingDate: new Date("2023-10-17"),
    target: new Date("2023-10-15"),
  },
};

BeforeStatus.parameters = {
  docs: {
    storyDescription: "通常のボタンです",
  },
};

export const AfterStatus: Story = {
  args: {
    meetingDate: new Date("2023-10-17"),
    target: new Date("2023-10-18"),
  },
};

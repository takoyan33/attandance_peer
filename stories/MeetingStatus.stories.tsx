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

/** 開催前のラベル */
export const BeforeStatus: Story = {
  args: {
    meetingDate: new Date("2023-10-17"),
    target: new Date("2023-10-15"),
  },
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
      // source: { type: "code" },
    },
  },
};

/** 開催後のラベル */
export const AfterStatus: Story = {
  args: {
    meetingDate: new Date("2023-10-17"),
    target: new Date("2023-10-18"),
  },
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
      // source: { type: "code" },
    },
  },
};

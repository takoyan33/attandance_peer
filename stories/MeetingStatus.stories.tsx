import { Meta, StoryObj } from "@storybook/react";
import { MeetingStatus } from "./MeetingStatus";

const meta: Meta<typeof MeetingStatus> = {
  component: MeetingStatus,
  title: "MeetingStatus",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BeforeStatus: Story = {
  args: {
    target: 1211,
    text: "1",
  },
};

export const AfterStatus: Story = {
  args: {
    target: 911,
    text: "2",
  },
};

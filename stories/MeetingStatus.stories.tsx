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
    meetingDate: new Date("2023-10-17"),
    target: new Date("2023-10-15"),
  },
};

export const AfterStatus: Story = {
  args: {
    meetingDate: new Date("2023-10-17"),
    target: new Date("2023-10-18"),
  },
};

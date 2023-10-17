import React from "react";
interface MeetingStatusProps {
  meetingDate: Date;
  target: Date;
}

export const MeetingStatus: React.FC<MeetingStatusProps> = ({
  meetingDate,
  target,
}) => {
  let statusClassName: string;
  if (target < meetingDate) {
    statusClassName = "bg-green-900";
  } else {
    statusClassName = "bg-blue-700";
  }

  return (
    <div>
      日付：{target.toDateString()}
      <span className={`m-2 p-2 text-white ${statusClassName}`}>
        {target < meetingDate ? "開催前" : "開催後"}
      </span>
    </div>
  );
};

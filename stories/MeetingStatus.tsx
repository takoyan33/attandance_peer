import React from "react";

interface MeetingStatusProps {
  target: any;
  text: string; // プロパティの型を指定する
}

export const MeetingStatus: React.FC<MeetingStatusProps> = ({
  target,
  text,
}) => {
  let statusClassName: string;
  if (1100 < target) {
    statusClassName = "bg-green-900";
  } else {
    statusClassName = "bg-blue-700";
  }

  return (
    <div>
      日付：11時00分
      <span className={`m-2 p-2 text-white ${statusClassName}`}>
        {1100 < target ? "開催前" : "開催後"}
      </span>
    </div>
  );
};

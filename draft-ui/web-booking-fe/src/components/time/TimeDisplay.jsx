import React from "react";
import { DateTime } from "luxon";

export default function TimeDisplay({ isoDate }) {
  return (
    <span>
      {DateTime.fromISO(isoDate, { zone: "utc" })
        .setZone("Asia/Bangkok") // Convert to UTC+7
        .toFormat("HH:mm")}
    </span>
  );
}

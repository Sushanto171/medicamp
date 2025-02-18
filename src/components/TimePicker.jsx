/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const TimePicker = ({ setTime, defaultTime = "" }) => {
  const [hour, setHour] = useState(defaultTime.slice(0, 2) || "12");
  const [minute, setMinute] = useState(defaultTime.slice(3, 5) || "00");
  const [period, setPeriod] = useState(
    defaultTime.slice(6, defaultTime.length) || "AM"
  );
  useEffect(() => {
    const realTime = `${hour}:${minute} ${period}`;
    setTime(realTime);
  }, [hour, minute, period, setTime]);

  return (
    <>
      <div className="flex gap-2 items-center border border-primary/50 rounded-md h-fit w-fit">
        {/* Hour Selector */}
        <select
          className="border border-gray-300 dark:bg-background rounded-md p-2"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
        >
          {Array.from({ length: 12 }, (_, i) =>
            String(i + 1).padStart(2, "0")
          ).map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
        {/* Minute Selector */}
        <select
          className="border border-gray-300 dark:bg-background rounded-md p-2"
          value={minute}
          onChange={(e) => setMinute(e.target.value)}
        >
          {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0")).map(
            (m) => (
              <option key={m} value={m}>
                {m}
              </option>
            )
          )}
        </select>
        {/* AM/PM Selector */}
        <select
          className="border border-gray-300 dark:bg-background rounded-md p-2"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </>
  );
};

export default TimePicker;

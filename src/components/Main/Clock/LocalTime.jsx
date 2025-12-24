import { useEffect, useState } from "react";

function LocalTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeParts = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
    .formatToParts(time)
    .reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});

  const date = time.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <>
      <div className="text-zinc-950 text-9xl font-bold flex pl-40 pt-40 gap-4">
        {timeParts.hour}:{timeParts.minute}
        <span className="text-4xl mb-4 opacity-85">:{timeParts.second}</span>
      </div>

      <hr className="border-t-4 border-zinc-950 w-1/4 mt-1" />

      <div className="text-3xl pl-42 mt-1">{date}</div>
    </>
  );
}

export default LocalTime;

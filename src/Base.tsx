import { useEffect, useState } from "react";

const Clock = ({ onChange }: { onChange: (value: number) => void }) => {
  console.log("Clock render");

  useEffect(() => {
    let tick = 0;

    const interval = setInterval(() => {
      tick += 1;
      onChange(tick);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [onChange]);

  return <h1>Clock is ticking</h1>;
};

const ClockWatcher = ({ value }: { value: number }) => {
  console.log("ClockWatcher render");

  return <h1>{value}</h1>;
};

const Parent = () => {
  console.log("Parent render");

  const [value, setValue] = useState(0);

  return (
    <div>
      <Clock onChange={setValue} />
      <ClockWatcher value={value} />
    </div>
  );
};

export default Parent;

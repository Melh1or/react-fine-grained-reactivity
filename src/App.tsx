import { useEffect, useState } from "react";

interface ClockProps {
  onChange: (value: number) => void;
}

const Clock = ({ onChange }: ClockProps) => {
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

interface ClockWatcherProps {
  value: number;
}

const ClockWatcher = ({ value }: ClockWatcherProps) => {
  console.log("ClockWatcher render");

  return <h1>{value}</h1>;
};

const App = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <Clock onChange={setValue} />
      <ClockWatcher value={value} />
    </div>
  );
};

export default App;

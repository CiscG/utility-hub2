import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";

interface TimerContextType {
  time: number;
  isRunning: boolean;
  setTime: (time: number) => void;
  setIsRunning: (isRunning: boolean) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [time, setTime] = useState(() => {
    const saved = localStorage.getItem("timer-time");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [isRunning, setIsRunning] = useState(() => {
    const saved = localStorage.getItem("timer-running");
    return saved === "true";
  });
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    localStorage.setItem("timer-time", time.toString());
  }, [time]);

  useEffect(() => {
    localStorage.setItem("timer-running", isRunning.toString());
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  return (
    <TimerContext.Provider value={{ time, isRunning, setTime, setIsRunning }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};

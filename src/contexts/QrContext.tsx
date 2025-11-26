import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface QrContextType {
  text: string;
  qrValue: string;
  setText: (text: string) => void;
  setQrValue: (qrValue: string) => void;
}

const QrContext = createContext<QrContextType | undefined>(undefined);

export const QrProvider = ({ children }: { children: ReactNode }) => {
  const [text, setText] = useState(() => {
    const saved = localStorage.getItem("qr-text");
    return saved || "";
  });
  const [qrValue, setQrValue] = useState(() => {
    const saved = localStorage.getItem("qr-value");
    return saved || "";
  });

  useEffect(() => {
    localStorage.setItem("qr-text", text);
  }, [text]);

  useEffect(() => {
    localStorage.setItem("qr-value", qrValue);
  }, [qrValue]);

  return (
    <QrContext.Provider value={{ text, qrValue, setText, setQrValue }}>
      {children}
    </QrContext.Provider>
  );
};

export const useQr = () => {
  const context = useContext(QrContext);
  if (context === undefined) {
    throw new Error("useQr must be used within a QrProvider");
  }
  return context;
};

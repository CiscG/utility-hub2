import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TimerProvider } from "@/contexts/TimerContext";
import { QrProvider } from "@/contexts/QrContext";
import Index from "./pages/Index";
import TextConverter from "./pages/TextConverter";
import PasswordGenerator from "./pages/PasswordGenerator";
import BmiCalculator from "./pages/BmiCalculator";
import Timer from "./pages/Timer";
import NetworkTools from "./pages/NetworkTools";
import QrGenerator from "./pages/QrGenerator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TimerProvider>
        <QrProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/text-converter" element={<TextConverter />} />
              <Route path="/password-generator" element={<PasswordGenerator />} />
              <Route path="/bmi-calculator" element={<BmiCalculator />} />
              <Route path="/timer" element={<Timer />} />
              <Route path="/network-tools" element={<NetworkTools />} />
              <Route path="/qr-generator" element={<QrGenerator />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </QrProvider>
      </TimerProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

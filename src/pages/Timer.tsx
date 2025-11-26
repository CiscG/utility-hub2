import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useTimer } from "@/contexts/TimerContext";

const Timer = () => {
  const { time, isRunning, setTime, setIsRunning } = useTimer();

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
      milliseconds: ms.toString().padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds, milliseconds } = formatTime(time);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <ToolLayout 
      title="Cronômetro" 
      description="Marque o tempo com precisão para suas atividades"
    >
      <Card className="max-w-lg mx-auto shadow-md">
        <CardContent className="p-8 space-y-8">
          <div className="text-center space-y-4">
            <div className="font-mono text-7xl font-bold text-foreground tracking-tight">
              {hours}:{minutes}:{seconds}
            </div>
            <div className="font-mono text-3xl text-muted-foreground">
              .{milliseconds}
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              onClick={handleStartPause}
              size="lg"
              className="gap-2 min-w-[140px]"
              variant={isRunning ? "outline" : "default"}
            >
              {isRunning ? (
                <>
                  <Pause className="h-5 w-5" />
                  Pausar
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  Iniciar
                </>
              )}
            </Button>
            <Button
              onClick={handleReset}
              size="lg"
              variant="outline"
              className="gap-2 min-w-[140px]"
            >
              <RotateCcw className="h-5 w-5" />
              Resetar
            </Button>
          </div>

          <div className="pt-4 text-center text-sm text-muted-foreground">
            {isRunning ? "⏱️ Cronômetro em execução..." : "▶️ Clique em Iniciar para começar"}
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default Timer;

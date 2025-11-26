import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { toast } from "sonner";

const BmiCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert to meters

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      toast.error("Digite valores válidos");
      return;
    }

    const bmiValue = w / (h * h);
    setBmi(parseFloat(bmiValue.toFixed(1)));

    let cat = "";
    if (bmiValue < 18.5) cat = "Abaixo do peso";
    else if (bmiValue < 25) cat = "Peso normal";
    else if (bmiValue < 30) cat = "Sobrepeso";
    else if (bmiValue < 35) cat = "Obesidade Grau I";
    else if (bmiValue < 40) cat = "Obesidade Grau II";
    else cat = "Obesidade Grau III";

    setCategory(cat);
    toast.success("IMC calculado!");
  };

  const getBmiColor = () => {
    if (!bmi) return "text-muted-foreground";
    if (bmi < 18.5) return "text-blue-500";
    if (bmi < 25) return "text-green-500";
    if (bmi < 30) return "text-yellow-500";
    if (bmi < 35) return "text-orange-500";
    return "text-red-500";
  };

  const getBmiEmoji = () => {
    if (!bmi) return "📊";
    if (bmi < 18.5) return "😟";
    if (bmi < 25) return "😊";
    if (bmi < 30) return "😐";
    if (bmi < 35) return "😰";
    return "😱";
  };

  return (
    <ToolLayout 
      title="Calculadora de IMC" 
      description="Calcule seu Índice de Massa Corporal e descubra sua classificação"
    >
      <Card className="max-w-md mx-auto shadow-md">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Peso (kg)
              </label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Ex: 70"
                min="0"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Altura (cm)
              </label>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Ex: 170"
                min="0"
                step="0.1"
              />
            </div>
          </div>

          <Button onClick={calculateBMI} className="w-full gap-2" size="lg">
            <Calculator className="h-5 w-5" />
            Calcular IMC
          </Button>

          {bmi !== null && (
            <div className="mt-6 p-6 bg-secondary/50 rounded-xl text-center space-y-3 border border-border/50">
              <div className="text-6xl mb-2">{getBmiEmoji()}</div>
              <div className={`text-5xl font-bold ${getBmiColor()}`}>
                {bmi}
              </div>
              <div className="text-lg font-semibold text-foreground">
                {category}
              </div>
              <div className="text-xs text-muted-foreground pt-2">
                <p className="mb-1"><strong>Abaixo de 18.5:</strong> Abaixo do peso</p>
                <p className="mb-1"><strong>18.5 - 24.9:</strong> Peso normal</p>
                <p className="mb-1"><strong>25 - 29.9:</strong> Sobrepeso</p>
                <p><strong>30 ou mais:</strong> Obesidade</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default BmiCalculator;

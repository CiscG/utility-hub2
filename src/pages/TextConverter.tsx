import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Type, ArrowUpCircle, ArrowDownCircle, Eraser, Shuffle } from "lucide-react";
import { toast } from "sonner";

const TextConverter = () => {
  const [text, setText] = useState("");

  const toUpperCase = () => {
    setText(text.toUpperCase());
    toast.success("Texto convertido para maiúsculas");
  };

  const toLowerCase = () => {
    setText(text.toLowerCase());
    toast.success("Texto convertido para minúsculas");
  };

  const removeAccents = () => {
    const newText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    setText(newText);
    toast.success("Acentos removidos");
  };

  const reverseText = () => {
    setText(text.split("").reverse().join(""));
    toast.success("Texto invertido");
  };

  const clearText = () => {
    setText("");
    toast.success("Texto limpo");
  };

  return (
    <ToolLayout 
      title="Conversor de Texto" 
      description="Transforme seu texto de diversas maneiras com apenas um clique"
    >
      <Card className="max-w-3xl mx-auto shadow-md">
        <CardContent className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Digite ou cole seu texto aqui:
            </label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Comece a digitar..."
              className="min-h-[200px] resize-none"
            />
            <p className="text-sm text-muted-foreground mt-2">
              {text.length} caracteres
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Button onClick={toUpperCase} variant="outline" className="gap-2">
              <ArrowUpCircle className="h-4 w-4" />
              MAIÚSCULAS
            </Button>
            <Button onClick={toLowerCase} variant="outline" className="gap-2">
              <ArrowDownCircle className="h-4 w-4" />
              minúsculas
            </Button>
            <Button onClick={removeAccents} variant="outline" className="gap-2">
              <Type className="h-4 w-4" />
              Sem Acentos
            </Button>
            <Button onClick={reverseText} variant="outline" className="gap-2">
              <Shuffle className="h-4 w-4" />
              Inverter
            </Button>
            <Button onClick={clearText} variant="outline" className="gap-2 md:col-span-2">
              <Eraser className="h-4 w-4" />
              Limpar Tudo
            </Button>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default TextConverter;

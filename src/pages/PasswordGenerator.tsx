import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeLetters, setIncludeLetters] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    let charset = "";
    if (includeLetters) charset += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (charset === "") {
      toast.error("Selecione pelo menos uma opção");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
    toast.success("Senha gerada com sucesso!");
  };

  const copyPassword = () => {
    if (!password) {
      toast.error("Gere uma senha primeiro");
      return;
    }
    navigator.clipboard.writeText(password);
    toast.success("Senha copiada!");
  };

  return (
    <ToolLayout 
      title="Gerador de Senhas" 
      description="Crie senhas fortes e seguras personalizadas para suas necessidades"
    >
      <Card className="max-w-2xl mx-auto shadow-md">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={password}
                readOnly
                placeholder="Sua senha aparecerá aqui"
                className="font-mono text-lg"
              />
              <Button onClick={copyPassword} variant="outline" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">
                  Tamanho da senha: {length}
                </label>
              </div>
              <Slider
                value={[length]}
                onValueChange={(value) => setLength(value[0])}
                min={6}
                max={32}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>6</span>
                <span>32</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="text-sm font-medium text-foreground block">
                Incluir:
              </label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="letters"
                    checked={includeLetters}
                    onCheckedChange={(checked) => setIncludeLetters(checked as boolean)}
                  />
                  <label htmlFor="letters" className="text-sm cursor-pointer">
                    Letras (A-Z, a-z)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="numbers"
                    checked={includeNumbers}
                    onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)}
                  />
                  <label htmlFor="numbers" className="text-sm cursor-pointer">
                    Números (0-9)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="symbols"
                    checked={includeSymbols}
                    onCheckedChange={(checked) => setIncludeSymbols(checked as boolean)}
                  />
                  <label htmlFor="symbols" className="text-sm cursor-pointer">
                    Símbolos (!@#$%...)
                  </label>
                </div>
              </div>
            </div>
          </div>

          <Button onClick={generatePassword} className="w-full gap-2" size="lg">
            <RefreshCw className="h-5 w-5" />
            Gerar Senha
          </Button>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default PasswordGenerator;

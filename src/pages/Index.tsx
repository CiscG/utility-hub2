import ToolCard from "@/components/ToolCard";
import { Type, Key, Scale, Timer, Wifi, QrCode } from "lucide-react";

const Index = () => {
  const tools = [
    {
      title: "Conversor de Texto",
      description: "Transforme texto em maiúsculas, minúsculas, remova acentos ou inverta",
      icon: Type,
      href: "/text-converter",
    },
    {
      title: "Gerador de Senhas",
      description: "Crie senhas seguras e personalizadas com facilidade",
      icon: Key,
      href: "/password-generator",
    },
    {
      title: "Calculadora de IMC",
      description: "Calcule seu Índice de Massa Corporal e veja sua classificação",
      icon: Scale,
      href: "/bmi-calculator",
    },
    {
      title: "Cronômetro",
      description: "Marque o tempo com precisão de milissegundos",
      icon: Timer,
      href: "/timer",
    },
    {
      title: "Ferramentas de Rede",
      description: "Veja seu IP público e faça testes de conexão",
      icon: Wifi,
      href: "/network-tools",
    },
    {
      title: "Gerador de QR Code",
      description: "Gere QR Codes instantaneamente para qualquer texto ou URL",
      icon: QrCode,
      href: "/qr-generator",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
            ⚡ Painel de Utilidades
          </h1>
          <p className="text-lg md:text-xl opacity-95 max-w-2xl mx-auto">
            Ferramentas práticas para o seu dia a dia, tudo em um só lugar
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </main>

      <footer className="border-t border-border/50 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Painel de Utilidades Online - Todas as ferramentas que você precisa</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

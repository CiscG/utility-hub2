import { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Wifi, Copy, Loader2, Activity } from "lucide-react";
import { toast } from "sonner";

interface PingResult {
  url: string;
  latency: number;
  timestamp: Date;
  success: boolean;
}

const NetworkTools = () => {
  const [publicIp, setPublicIp] = useState<string>("");
  const [localIp, setLocalIp] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [pingUrl, setPingUrl] = useState("https://www.google.com");
  const [pinging, setPinging] = useState(false);
  const [pingHistory, setPingHistory] = useState<PingResult[]>([]);

  const fetchPublicIP = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      setPublicIp(data.ip);
    } catch (error) {
      setPublicIp("Erro ao obter IP público");
    }
  };

  const fetchLocalIP = async () => {
    try {
      const pc = new RTCPeerConnection({ iceServers: [] });
      pc.createDataChannel("");
      
      pc.createOffer().then((offer) => pc.setLocalDescription(offer));
      
      pc.onicecandidate = (ice) => {
        if (!ice || !ice.candidate || !ice.candidate.candidate) return;
        const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
        const match = ipRegex.exec(ice.candidate.candidate);
        if (match) {
          setLocalIp(match[1]);
          pc.onicecandidate = null;
          pc.close();
        }
      };
    } catch (error) {
      setLocalIp("Não disponível");
    }
  };

  const fetchAllIPs = async () => {
    setLoading(true);
    await Promise.all([fetchPublicIP(), fetchLocalIP()]);
    setLoading(false);
    toast.success("IPs obtidos com sucesso!");
  };

  useEffect(() => {
    fetchAllIPs();
  }, []);

  const copyIP = (ip: string, type: string) => {
    if (ip && !ip.includes("Erro") && ip !== "Não disponível") {
      navigator.clipboard.writeText(ip);
      toast.success(`${type} copiado!`);
    }
  };

  const testPing = async () => {
    if (!pingUrl.trim()) {
      toast.error("Digite uma URL válida");
      return;
    }

    setPinging(true);
    const startTime = performance.now();

    try {
      // Adiciona https:// se não tiver protocolo
      let urlToTest = pingUrl;
      if (!urlToTest.startsWith("http://") && !urlToTest.startsWith("https://")) {
        urlToTest = "https://" + urlToTest;
      }

      // Usa mode: 'no-cors' para evitar problemas de CORS
      await fetch(urlToTest, { 
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache'
      });
      
      const endTime = performance.now();
      const latency = Math.round(endTime - startTime);

      const result: PingResult = {
        url: urlToTest,
        latency,
        timestamp: new Date(),
        success: true,
      };

      setPingHistory([result, ...pingHistory.slice(0, 4)]);
      toast.success(`Ping: ${latency}ms`);
    } catch (error) {
      const endTime = performance.now();
      const latency = Math.round(endTime - startTime);
      
      const result: PingResult = {
        url: pingUrl,
        latency,
        timestamp: new Date(),
        success: false,
      };

      setPingHistory([result, ...pingHistory.slice(0, 4)]);
      toast.error("Falha ao testar ping");
    } finally {
      setPinging(false);
    }
  };

  return (
    <ToolLayout 
      title="Ferramentas de Rede" 
      description="Verifique informações sobre sua conexão de rede"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="shadow-md">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Wifi className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Informações de Rede</h3>
                <p className="text-sm text-muted-foreground">IPs público e local</p>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8 text-muted-foreground gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Obtendo IPs...</span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-secondary/50 rounded-lg p-6 border border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">IP Público:</p>
                      <p className="text-2xl font-mono font-bold text-foreground">{publicIp}</p>
                    </div>
                    <Button onClick={() => copyIP(publicIp, "IP público")} variant="outline" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-secondary/50 rounded-lg p-6 border border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">IP Local (LAN):</p>
                      <p className="text-2xl font-mono font-bold text-foreground">{localIp}</p>
                    </div>
                    <Button onClick={() => copyIP(localIp, "IP local")} variant="outline" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <Button onClick={fetchAllIPs} className="w-full" variant="outline" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Atualizando...
                </>
              ) : (
                "Atualizar IPs"
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Activity className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Teste de Ping</h3>
                <p className="text-sm text-muted-foreground">Teste a latência de conexão</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  URL ou Host:
                </label>
                <Input
                  value={pingUrl}
                  onChange={(e) => setPingUrl(e.target.value)}
                  placeholder="www.google.com"
                  onKeyPress={(e) => e.key === "Enter" && testPing()}
                />
              </div>

              <Button onClick={testPing} className="w-full" disabled={pinging}>
                {pinging ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Testando...
                  </>
                ) : (
                  "Testar Ping"
                )}
              </Button>
            </div>

            {pingHistory.length > 0 && (
              <div className="mt-6 space-y-2">
                <h4 className="text-sm font-semibold text-foreground">Histórico de Testes:</h4>
                <div className="space-y-2">
                  {pingHistory.map((result, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        result.success
                          ? "bg-secondary/30 border-border/50"
                          : "bg-destructive/10 border-destructive/30"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-mono text-foreground truncate">
                          {result.url}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {result.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="ml-3 flex items-center gap-2">
                        {result.success ? (
                          <span className="text-lg font-bold text-foreground">
                            {result.latency}ms
                          </span>
                        ) : (
                          <span className="text-sm font-medium text-destructive">
                            Falhou
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default NetworkTools;

import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { useQr } from "@/contexts/QrContext";

const QrGenerator = () => {
  const { text, qrValue, setText, setQrValue } = useQr();

  const generateQR = () => {
    if (!text.trim()) {
      toast.error("Digite um texto ou URL");
      return;
    }
    setQrValue(text);
    toast.success("QR Code gerado!");
  };

  const downloadQR = () => {
    if (!qrValue) {
      toast.error("Gere um QR Code primeiro");
      return;
    }

    const svg = document.getElementById("qr-code");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.download = "qrcode.png";
      downloadLink.href = pngFile;
      downloadLink.click();
      
      toast.success("QR Code baixado!");
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <ToolLayout 
      title="Gerador de QR Code" 
      description="Crie QR Codes personalizados instantaneamente para qualquer texto ou URL"
    >
      <Card className="max-w-lg mx-auto shadow-md">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Digite o texto ou URL:
              </label>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://exemplo.com ou qualquer texto"
                onKeyPress={(e) => e.key === "Enter" && generateQR()}
              />
            </div>

            <Button onClick={generateQR} className="w-full gap-2" size="lg">
              <QrCode className="h-5 w-5" />
              Gerar QR Code
            </Button>
          </div>

          {qrValue && (
            <div className="space-y-4">
              <div className="flex justify-center p-8 bg-white rounded-xl border-2 border-border">
                <QRCodeSVG
                  id="qr-code"
                  value={qrValue}
                  size={256}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <Button onClick={downloadQR} variant="outline" className="w-full gap-2">
                <Download className="h-4 w-4" />
                Baixar QR Code
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Escaneie o QR Code com seu celular para acessar: <br />
                <span className="font-mono break-all">{qrValue}</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default QrGenerator;

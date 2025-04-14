import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function FinancialReportApp() {
  const [files, setFiles] = useState([]);
  const [reportText, setReportText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const generateReport = async () => {
    if (files.length === 0) {
      alert("Primero subí al menos un archivo.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const fileNames = files.map(file => file.name).join(", ");
      const simulatedReport = `Informe ejecutivo generado a partir de los archivos: ${fileNames}.

[Síntesis general]
Lorem ipsum dolor sit amet...

[Análisis operativo y del negocio]
...

[Perfil financiero y posición de riesgo]
...

[Consideraciones estratégicas]
...

[Conclusión]
...`;
      setReportText(simulatedReport);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Generador de Reportes Financieros</h1>

      <Card className="mb-4">
        <CardContent className="p-4">
          <label className="block mb-2 font-semibold">Subí tus archivos financieros (PDF, DOCX, XLSX, etc.):</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="mb-4"
          />
          <div className="mt-4">
            <Button onClick={generateReport} disabled={loading}>
              {loading ? "Generando..." : "Generar Reporte"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {reportText && (
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Informe Generado</h2>
            <Textarea className="w-full h-[500px]" value={reportText} readOnly />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

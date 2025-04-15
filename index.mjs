import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
import pdfParse from 'pdf-parse';

const app = express();
app.use(cors());
const upload = multer({ storage: multer.memoryStorage() });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get('/', (req, res) => {
  res.send('API de generación de reportes activa');
});

app.post('/generar-reporte', upload.array('files'), async (req, res) => {
  try {
    const texts = await Promise.all(
      req.files.map(async (file) => {
        if (file.mimetype === 'application/pdf') {
          const data = await pdfParse(file.buffer);
          return data.text;
        } else {
          return `Archivo no compatible (${file.originalname})`;
        }
      })
    );

    const contenido = texts.join('\n\n');
    const prompt = `A partir del siguiente contenido financiero, redactá un informe ejecutivo como el que venimos usando:\n\n${contenido}`;

    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      temperature: 0,
      messages: [{ role: 'user', content: prompt }],
    });

    const reporte = completion.data.choices[0].message.content;
    res.json({ reporte });
  } catch (error) {
    console.error('Error generando reporte:', error);
    res.status(500).json({ error: 'Error generando el informe' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

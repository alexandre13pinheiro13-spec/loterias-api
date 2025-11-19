import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fetchMegaSena } from "./scraper/megasena.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 🔄 Atualizar manualmente
app.get("/update/megasena", async (req, res) => {
  const r = await fetchMegaSena();
  res.json({ updated: true, r });
});

// 📌 Endpoint público
app.get("/megasena", (req, res) => {
  const cachePath = path.join(__dirname, "cache", "megasena.json");

  if (!fs.existsSync(cachePath)) {
    return res.json({ error: "Nenhum dado em cache ainda." });
  }

  const data = JSON.parse(fs.readFileSync(cachePath, "utf8"));
  res.json(data);
});

app.listen(PORT, () => console.log(`API ativa em http://localhost:${PORT}`));

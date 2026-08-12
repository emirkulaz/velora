const path = require("path");
const fs = require("fs");
const express = require("express");
const multer = require("multer");
const initSqlJs = require("sql.js");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const DB_DIR = path.join(ROOT, "db");
const UPLOAD_DIR = path.join(ROOT, "uploads");
const DB_PATH = path.join(DB_DIR, "trikomex.db");
const SCHEMA_PATH = path.join(DB_DIR, "schema.sql");

fs.mkdirSync(DB_DIR, { recursive: true });
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

let db;

function persist() {
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

function rowsFrom(stmt) {
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

function getQuoteById(id) {
  const stmt = db.prepare(`
    SELECT id, name, phone, email, product_type, quantity, dimensions, message, file_name, created_at
    FROM quotes
    WHERE id = ?
  `);
  stmt.bind([id]);
  const row = stmt.step() ? stmt.getAsObject() : null;
  stmt.free();
  return row;
}

async function boot() {
  const SQL = await initSqlJs();
  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  db.run(fs.readFileSync(SCHEMA_PATH, "utf8"));
  persist();

  const storage = multer.diskStorage({
    destination: UPLOAD_DIR,
    filename: function (_req, file, cb) {
      const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
      cb(null, Date.now() + "-" + safe);
    }
  });

  const upload = multer({
    storage,
    limits: { fileSize: 8 * 1024 * 1024 },
    fileFilter: function (_req, file, cb) {
      const ok = /^(image\/|application\/pdf)/.test(file.mimetype);
      cb(ok ? null : new Error("Type de fichier non autorisé"), ok);
    }
  });

  const app = express();

  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, db: "sqlite", file: "db/trikomex.db" });
  });

  app.post("/api/quotes", upload.single("file"), (req, res) => {
    try {
      const name = String(req.body.name || "").trim();
      const phone = String(req.body.phone || "").trim();
      const email = String(req.body.email || "").trim();
      const productType = String(req.body.product || req.body.product_type || "").trim();
      const quantity = String(req.body.quantity || "").trim();
      const dimensions = String(req.body.dimensions || "").trim();
      const message = String(req.body.message || "").trim();

      if (!name || !phone || !email || !productType) {
        return res.status(400).json({
          ok: false,
          error: "Champs obligatoires manquants: name, phone, email, product."
        });
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ ok: false, error: "E-mail invalide." });
      }

      db.run(
        `INSERT INTO quotes (
          name, phone, email, product_type, quantity, dimensions, message, file_name
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name,
          phone,
          email,
          productType,
          quantity || null,
          dimensions || null,
          message || null,
          req.file ? req.file.filename : null
        ]
      );

      const idRow = db.exec("SELECT last_insert_rowid() AS id");
      const id = idRow[0].values[0][0];
      persist();

      res.status(201).json({
        ok: true,
        message: "Demande enregistrée dans SQLite.",
        quote: getQuoteById(id)
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, error: "Impossible d'enregistrer la demande." });
    }
  });

  app.get("/api/quotes", (_req, res) => {
    try {
      const stmt = db.prepare(`
        SELECT id, name, phone, email, product_type, quantity, dimensions, message, file_name, created_at
        FROM quotes
        ORDER BY datetime(created_at) DESC, id DESC
      `);
      res.json({ ok: true, quotes: rowsFrom(stmt) });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, error: "Impossible de lire les demandes." });
    }
  });

  app.use("/uploads", express.static(UPLOAD_DIR));
  app.use(express.static(ROOT, {
    extensions: ["html"],
    index: "index.html"
  }));

  app.use((error, _req, res, _next) => {
    if (error) {
      return res.status(400).json({ ok: false, error: error.message || "Erreur serveur." });
    }
    res.status(500).json({ ok: false, error: "Erreur serveur." });
  });

  app.listen(PORT, () => {
    console.log("TRIKOMEX SQL server: http://localhost:" + PORT);
    console.log("SQLite database: " + DB_PATH);
  });
}

boot().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

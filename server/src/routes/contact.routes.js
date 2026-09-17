import { Router } from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { validateContact } from "../utils/validateContact.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolve the storage file relative to the server's working directory so the
// CONTACTS_FILE env var can be a relative path (as in .env.example).
const CONTACTS_FILE = path.resolve(
  process.cwd(),
  process.env.CONTACTS_FILE || "./src/data/contacts.json"
);

async function readContacts() {
  try {
    const raw = await fs.readFile(CONTACTS_FILE, "utf-8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    // File missing on first run — start with an empty list.
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function writeContacts(contacts) {
  await fs.mkdir(path.dirname(CONTACTS_FILE), { recursive: true });
  await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2), "utf-8");
}

const router = Router();

// POST /api/contact — validate + persist a new submission
router.post("/", async (req, res, next) => {
  try {
    const errors = validateContact(req.body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ error: "Validation failed", fields: errors });
    }

    const { name, email, message } = req.body;
    const contacts = await readContacts();

    const submission = {
      id: contacts.length ? contacts[contacts.length - 1].id + 1 : 1,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    contacts.push(submission);
    await writeContacts(contacts);

    res.status(201).json({
      message: "Thanks! Your message has been received.",
      submission,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/contact — list everything received so far (no auth — open by design, see README)
router.get("/", async (req, res, next) => {
  try {
    const contacts = await readContacts();
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
});

export default router;

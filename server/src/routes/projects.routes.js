import { Router } from "express";
import { projects } from "../data/projects.js";

const router = Router();

// GET /api/projects — full list, backs the Projects page
router.get("/", (req, res) => {
  res.status(200).json(projects);
});

// GET /api/projects/:id — single project, backs the /projects/:projectId detail page
router.get("/:id", (req, res) => {
  const { id } = req.params;
  // Support both numeric and string ids without throwing on non-numeric input.
  const project = projects.find((p) => String(p.id) === String(id));

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  res.status(200).json(project);
});

export default router;

import { Router } from "express";
import userRoutes from "./users";

const router = Router();

// Mount routes
router.use("/users", userRoutes);

// Health check endpoint
router.get("/test", (req, res) => {
  res.json({ message: "Server is running!" });
});

export default router;

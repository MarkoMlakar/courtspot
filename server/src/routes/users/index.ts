import { Router } from "express";
import { UserController } from "../../controllers/userController";

const router = Router();

// User routes
router.post("/", async (req, res, next) => {
  try {
    await UserController.createUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    await UserController.loginUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    await UserController.getAllUsers(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    await UserController.getUserById(req, res);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    await UserController.updateUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/password", async (req, res, next) => {
  try {
    await UserController.updatePassword(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await UserController.deleteUser(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;

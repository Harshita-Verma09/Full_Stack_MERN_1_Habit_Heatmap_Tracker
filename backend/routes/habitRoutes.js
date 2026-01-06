
import express from "express";
import { logHabit, getHabits} from "../controllers/habitController.js";

const router = express.Router();

router.post("/log", logHabit);
router.get("/", getHabits);

export default router;

import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { getalljobs, getJobById, getJobsByCreator, postJob } from "../controllers/job.controller.js";
const router = express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/getjobs").get(isAuthenticated,getalljobs);
router.route("/get/:id").get(isAuthenticated,getJobById);
router.route("/getjobsbycreator").get(isAuthenticated,getJobsByCreator);

export default router;
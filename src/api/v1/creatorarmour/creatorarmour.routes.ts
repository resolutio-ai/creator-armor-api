import express from "express";
import creatorarmourController from "./creatorarmour.controller";

const creatorArmorRouter = express.Router();

creatorArmorRouter.post("/", creatorarmourController.createTimeStamp)
    .get("/", creatorarmourController.getCreatedWork)

export default creatorArmorRouter;
import express from "express";
import creatorarmourController from "./creatorarmour.controller";

const router = express.Router();

router.post("/", creatorarmourController.createTimeStamp)
    .get("/", creatorarmourController.getCreatedWork)
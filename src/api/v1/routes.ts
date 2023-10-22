import express from "express";
import authRouter from "./auth/auth.route";
import creatorArmorRouter from "./creatorarmour/creatorarmour.routes";

const appRouter = express.Router();

appRouter
    .use("/auth", authRouter)
    .use("/creator", creatorArmorRouter);

export default appRouter;
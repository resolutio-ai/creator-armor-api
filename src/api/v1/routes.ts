import express from "express";
import authRouter from "./auth/auth.route";

const appRouter = express.Router();

appRouter
    .use("/auth", authRouter);

export default appRouter;
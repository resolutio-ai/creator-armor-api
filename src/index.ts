import express from "express";
import cors from "cors"
import { connectDatabase } from "./resources/config/database.config";

import { corsOptions } from "./resources/utils/constant.utils";
import { PORT } from "./resources/config/env.config";
import appRouter from "./api/v1/routes";

const app = express();

connectDatabase();

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.get("/", async (_, res) => {
    res.status(200).send("Welcome to Resolutio Evidence Based:)");
});

app.use("/api", appRouter)


app.all("*", (_, res) =>
    res.status(404).send({ message: "route not found" })
);

app.listen(PORT || 3000, () => {
    console.log(
        `Server running\nListening on port:${PORT}`
    );
});
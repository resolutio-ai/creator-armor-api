import { Magic } from "@magic-sdk/admin";
import { MAGIC_SECRET } from "../config/env.config";

let instance: Magic | undefined = undefined;

export const getMagicAdmin = () => {
    if (instance) return instance;

    const magicSecretKey = MAGIC_SECRET;
    if (magicSecretKey === undefined || magicSecretKey === "")
        throw new Error("MAGIC_SECRET_KEY");

    instance = new Magic(magicSecretKey);
    return instance;
};
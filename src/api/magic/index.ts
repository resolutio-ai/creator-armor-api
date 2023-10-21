import { Magic } from "@magic-sdk/admin";
import { MAGIC_SECRET } from "../../resources/config/env.config";

let instance: Magic | undefined = undefined;

export const getMagicAdmin = () => {
    if (instance) return instance;

    const magicSecretKey = MAGIC_SECRET;
    if (magicSecretKey === undefined || magicSecretKey === "")
        throw new Error("MAGIC_SECRET_KEY");

    instance = new Magic(magicSecretKey);
    return instance;
};

export const getMagicClient = () => {
    const magicPubKey = process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY;
    if (magicPubKey === undefined || magicPubKey === "") {
      throw new Error("NEXT_PUBLIC_MAGIC_PUBLIC_KEY");
    }
  
    if (typeof window === "undefined") {
      throw new Error(
        "Magic web client should be used in non-SSR environments"
      );
    }
  
    if (!instance) {
      // Todo: setup chain config
      instance = new Magic(magicPubKey);
    }
  
    return instance;
  };
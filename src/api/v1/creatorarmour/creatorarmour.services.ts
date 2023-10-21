import axios from "axios";
import { retrieveFiles } from "../../web3storage";
import { CreatedWork } from "./creatorarmour.schema";

export const getFiles = async (cid: string) => {
    const files = await retrieveFiles(cid);

    if (files.length === 0) {
        throw new Error("No files found.");
    }

    const creatorDetails: CreatedWork = {
        nameOfWork: "",
        creatorId: "",
        altMedium: "",
        medium: "",
        license: "",
        timeStamp: "",
        image: "",
    };

    await Promise.all(
        files.map(async (file) => {
            if (file.name.includes(".jpeg") || file.name.includes(".png")) {
                creatorDetails.image = `https://ipfs.io/ipfs/${file.cid}`;
            } else {
                const response = await axios.get(`https://${file.cid}.ipfs.w3s.link/`);
                creatorDetails[file.name] = response.data as string;
            }
        })
    );

    return creatorDetails;
};

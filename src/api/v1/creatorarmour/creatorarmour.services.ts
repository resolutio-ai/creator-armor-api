import axios from "axios";
import { retrieveFiles } from "../../web3storage";
import { CreatedWork } from "./creatorarmour.schema";
import { executeUserOp, getPartialUserOp } from "../../biconomy";
import { ethers } from "ethers";
import { getNetworkConfig } from "../../../resources/utils/network.utils";

class CreateArmourService {

    getFiles = async (cid: string, chainname : string) => {
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

    getTimeStampHash = async (cid: string, chainname: string) => {

        const { chainId, contractAddress } = getNetworkConfig(chainname);

        const nftInterface = new ethers.utils.Interface([
            "function createTimeStamp(string cid)",
        ]);

        const data = nftInterface.encodeFunctionData("createTimeStamp", [cid]);

        const transaction = {
            to: contractAddress,
            data: data
        };

        const partialUserOp = await getPartialUserOp(transaction, chainId);

        return await executeUserOp(partialUserOp);
    }
}

export default new CreateArmourService();

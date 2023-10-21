import { Request, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK, ONE } from "../../../resources/utils/constant.utils";
import { storeFiles } from "../../web3storage";
import creatorarmourServices from "./creatorarmour.services";
import { CreatedWork } from "./creatorarmour.schema";

class CreatorArmourController {
    getCreatedWork = async (request: Request, response: Response) => {
        const { cid, chainName } = request.query;
    
        if (!cid) {
            response.status(BAD_REQUEST).send({})
        }
    
        let work: CreatedWork | null = null;
    
        try {
            work = await creatorarmourServices.getFiles(cid as string, chainName);
        } catch (error: any) {
            return response.status(INTERNAL_SERVER_ERROR).
                send({
                    message: `An Error Ocurred: \n${error.message}`
                });
        }
    
        return response.status(OK).send({ message: "Success", data: work });
    }
    
    createTimeStamp = async (request: Request, response: Response) => {
        const { files, chainId } = request.body;
    
        if (!files || files.length < ONE || !chainId) {
            return response.status(BAD_REQUEST).send({ message: "Invalid Parameters Sent" });
        }
    
        let cid;
        let hash;
    
        try {
            cid = await storeFiles(files);
    
            hash = await creatorarmourServices.getTimeStampHash(cid as string, chainId);
        } catch (error: any) {
            return response.status(INTERNAL_SERVER_ERROR).send({ message: `An Error Ocurred: \n${error.message}` })
        }
    
        return response.status(OK).send(
            {
                message: "Success",
                Data: { transactionHash: hash }
            }
        );
    }
}

export default new CreatorArmourController();

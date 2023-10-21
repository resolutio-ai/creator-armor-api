import { Request, Response } from "express";
import { BAD_REQUEST, OK } from "../../../resources/utils/constant.utils";
import { getFiles } from "./creatorarmour.services";

const getCreatedWork = async (request: Request, response: Response) => {
    const { cid } = request.query;

    if (!cid) {
        response.status(BAD_REQUEST).send({})
    }

    try {

    } catch (error: any) {

    }

    const work = await getFiles(cid as string);

    if (!work) {
        return
    }

    return response.status(OK).send({ message: "", data: work });
}
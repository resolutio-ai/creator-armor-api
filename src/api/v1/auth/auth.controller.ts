import { Request, Response } from "express";
import { User } from "../user/user.model";
import authService from "./auth.service";
import { BAD_REQUEST, OK, UNAUTHORIZED } from "../../../resources/utils/constant.utils";

interface AuthenticatedUser {
    email: string;
    walletAddress: string;
}

class AuthController {
    async authenticate(request: Request, response: Response) {
        const { DIDToken } = request.body;

        if (!DIDToken) {
            return response.status(UNAUTHORIZED).send({ message: "Invalid Token" })
        }

        try {
            const { email, publicAddress } = await authService.validateDIDToken(DIDToken);
        } catch (error: any) {
            return response.status(BAD_REQUEST).send({ message: `${error.message}` })
        }
        const { email, publicAddress } = await authService.validateDIDToken(DIDToken);

        let user = await User.findById(email);

        if (!user) {
            user = await User.create({
                _id: email,
                walletAddress: publicAddress
            });
        }

        return response.status(OK).send({
            message: "success",
            data: {
                email: email,
                walletAddress: publicAddress,
            }
        });
    }

}

export default new AuthController();

//User table
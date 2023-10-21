import { getMagicAdmin } from "../../../resources/magic";

class AuthService {
    async validateDIDToken(didToken: string) {
        const magic = getMagicAdmin();

        try {
            magic.token.validate(didToken);
        } catch (error: any) {
            throw new Error(`Invalid Token`);
        }

        const magicUser = await magic.users.getMetadataByToken(didToken);

        const { issuer, publicAddress, email } = magicUser;

        if (!publicAddress || !issuer || !email)
            throw new Error("Couldn't fetch required data");

        return {
            issuer,
            publicAddress,
            email,
        };
    };
}

export default new AuthService();
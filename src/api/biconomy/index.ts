
import { config } from "dotenv"
import { IBundler, Bundler } from '@biconomy/bundler'
import { BiconomySmartAccountV2, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account"
import { ECDSAOwnershipValidationModule, DEFAULT_ECDSA_OWNERSHIP_MODULE } from "@biconomy/modules";
import { Wallet, providers, ethers } from 'ethers'
import { ChainId, UserOperation } from "@biconomy/core-types"
import {
    IPaymaster,
    BiconomyPaymaster,
    IHybridPaymaster,
    PaymasterMode,
    SponsorUserOperationDto,
} from '@biconomy/paymaster'
import { Address } from "viem";

config();

let smartAccount: BiconomySmartAccountV2;

let bundler: Bundler;

let address: string


const paymaster: IPaymaster = new BiconomyPaymaster({
    paymasterUrl:
        "https://paymaster.biconomy.io/api/v1/80001/Tpk8nuCUd.70bd3a7f-a368-4e5a-af14-80c7f1fcda1a",
});



const getWallet = (rpcUrl: string) => {
    const provider = new providers.JsonRpcProvider(
        rpcUrl
    );

    return new Wallet(process.env.PRIVATE_KEY || "", provider);
}

const getBundler = (chainId: number) => {
    return bundler ??= new Bundler({
        bundlerUrl:
            `https://bundler.biconomy.io/api/v2/${chainId}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
        chainId: chainId,
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
    });
}

const getModule = async (rpcUrl: string) => {
    return await ECDSAOwnershipValidationModule.create({
        signer: getWallet(rpcUrl),
        moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE
    })
}

export async function createAccount(chainId: number) {

    const rpcUrl = ""

    smartAccount ??= await BiconomySmartAccountV2.create({
        chainId: ChainId.POLYGON_MUMBAI,
        bundler: bundler,
        paymaster: paymaster,
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
        defaultValidationModule: await getModule(rpcUrl),
        activeValidationModule: await getModule(rpcUrl)
    })

    address ??= await smartAccount.getAccountAddress();

    return smartAccount;
}

export const executeUserOp = async (partialUserOp: Partial<UserOperation>) => {
    try {
        const userOpResponse = await smartAccount.sendUserOp(partialUserOp);

        const transactionDetails = await userOpResponse.wait();

        if (!transactionDetails || !transactionDetails.receipt || !transactionDetails.receipt.transactionHash) {
            throw new Error(!transactionDetails ? "Invalid Transaction Details Returned"
                : !transactionDetails.receipt ? "Invalid Transaction Receipt Returned"
                    : "Invalid Transaction Hash Returned");
        }

        return transactionDetails.receipt.transactionHash
    } catch (error: any) {
        throw new Error("Error Sending User Operation" + `\n${error.message}`)
    }
}

export const getPartialUserOp = async (transaction: { to: string, data: any }, chainId : number) => {

    await createAccount(chainId);

    let partialUserOp = await smartAccount.buildUserOp([transaction]);

    const biconomyPaymaster =
        smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;

    let paymasterServiceData: SponsorUserOperationDto = {
        mode: PaymasterMode.SPONSORED,
        smartAccountInfo: {
            name: 'BICONOMY',
            version: '2.0.0'
        },
    };

    try {
        const paymasterAndDataResponse =
            await biconomyPaymaster.getPaymasterAndData(
                partialUserOp,
                paymasterServiceData
            );

        partialUserOp.paymasterAndData =
            paymasterAndDataResponse.paymasterAndData;

        return partialUserOp;
    } catch (error: any) {
        throw new Error("Error while fetching paymaster data" + `\n${error.message}`);
    }
}
type indexable = {
    [key: string]: any;
};

interface NetworkConfig extends indexable {
    polygonTestnet: {
        rpcUrl: string;
        chainId: number;
        explorerUrl: string;
        contractAddress: ""
    };
    scrollTestnet: {
        rpcUrl: string;
        chainId: number;
        explorerUrl: string;
        contractAddress: ""
    };
    optimismTestnet: {
        rpcUrl: string;
        chainId: number;
        explorerUrl: string;
        contractAddress: ""
    };
}

const networkConfig: NetworkConfig = {
    polygonTestnet: {
        rpcUrl: "https://rpc.ankr.com/polygon_mumbai",
        chainId: 80001,
        explorerUrl: "https://mumbai.polygonscan.com",
        contractAddress: ""
    },
    scrollTestnet: {
        rpcUrl: "https://polygon-mainnet.g.alchemy.com/v2/zHEgzvGizW0dHlGJ7J6ZP477wnNlepoF",
        chainId: 534351,
        explorerUrl: "https://polygonscan.com",
        contractAddress: ""
    },
    optimismTestnet: {
        rpcUrl: "https://polygon-mainnet.g.alchemy.com/v2/zHEgzvGizW0dHlGJ7J6ZP477wnNlepoF",
        chainId: 420,
        explorerUrl: "https://goerli-optimism.etherscan.io/",
        contractAddress: ""
    },
};

const getNetworkConfig = (chainName: string) => {
    return networkConfig[chainName];
};

const getSafeServiceUrl = (chainName: string) => {
    return networkConfig[chainName].safeService;
};

const getTransactionExplorerUrl = (txHash: string, chainName: string): string => {
    const explorerUrl = networkConfig[chainName].explorerUrl;

    return `https://${explorerUrl}/tx/${txHash}`;
};

const getAddressExplorerUrl = (address: string, chainName: string): string => {
    const explorerUrl = networkConfig[chainName].explorerUrl;

    return `https://${explorerUrl}/address/${address}`;
};

export { getAddressExplorerUrl, getNetworkConfig, getTransactionExplorerUrl, getSafeServiceUrl }

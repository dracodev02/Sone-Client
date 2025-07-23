export const monadTestnet = {
    id: 1337,
    name: 'Monad Testnet',
    network: 'monad-testnet',
    nativeCurrency: {
        name: 'Monad',
        symbol: 'MON',
        decimals: 18
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.testnet.monad.xyz']
        }
    },
    blockExplorers: {
        default: {
            name: 'Monad Explorer',
            url: 'https://explorer.testnet.monad.xyz'
        }
    },
    testnet: true
} 
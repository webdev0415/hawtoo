
export default {
    createChartLinks(contractAddress) {
        return {
            'binance': {
                'PooCoin': `https://poocoin.app/tokens/${contractAddress}`,
                'Bogged Finance': `https://charts.bogged.finance/${contractAddress}`
            },
            'ethereum': {
                'DexTools': `https://www.dextools.io/app/ether/pair-explorer/${contractAddress}`,
                'Zerion': `https://app.zerion.io/search?q=${contractAddress}`
            }
        }
    },

    createBuyLinks(contractAddress) {
        return {
            'binance': {
                'PancakeSwap': `https://pancakeswap.finance/swap#/swap?inputCurrency=${contractAddress}`,
                'BakerySwap': `https://www.bakeryswap.org/#/swap?inputCurrency=${contractAddress}`
            },
            'ethereum': {
                'Uniswap': `https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${contractAddress}`,
                'Sushiswap': `https://app.uniswap.org/#/swap`
            }
        }
    },

    createChainAbbrevation() {
        return {
            'binance': 'BSC',
            'ethereum': 'ETH'
        }
    },

    getBlockExplorerUrl(chainInitials, address) {
        switch (chainInitials) {
            case "binance":
                chainInitials = "bscscan.com";
                break;
            case "ethereum":
                chainInitials = "etherscan.io";
                break;
            default:
                chainInitials = "etherscan.io";
                break;
        }

        return `https://${chainInitials}/address/${address}`;
    },
}
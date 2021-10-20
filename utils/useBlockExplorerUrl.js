export const useBlockExplorerUrl = (chainInitials, address) => {
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
}
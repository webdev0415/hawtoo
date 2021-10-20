import { useWatchlistCount } from "./useWatchlistCount";
import { useMembershipStatusByReferrals } from "./useMembershipStatusByReferrals";

const MAX_WATCHLIST_LEVEL_0 = 1;
const MAX_WATCHLIST_LEVEL_1 = 3;
const MAX_WATCHLIST_LEVEL_2 = 10;

export async function useCanCreateWatchlist(userId) {

    if (!userId) {
        throw new Error("Missing user ID.");
    }

    if (typeof userId !== "string") {
        throw new TypeError(`Expected user ID to be a string: ${userId}`);
    }

    const membershipStatusByReferral = await useMembershipStatusByReferrals();
    const watchlistQuery = await useWatchlistCount(userId);
    const watchlistCount = watchlistQuery + 1; // Total watchlists the member will end up with.

    // Members that are verified can create as many watchlists as they want.
    if (membershipStatusByReferral === "verified") {
        return true;
    }

    // Members with 25 or more referrals can create as many watchlists as they want.
    if (membershipStatusByReferral === 'level_3') {
        return true;
    }

    // Members with 10 or more referrals, but not more than 24.
    if (membershipStatusByReferral === 'level_2' && watchlistCount <= MAX_WATCHLIST_LEVEL_2) {
        return (watchlistCount <= MAX_WATCHLIST_LEVEL_2)
    }

    // Members with 3 or more referrals, but not more than 9.
    if (membershipStatusByReferral === 'level_1') {
        return (watchlistCount <= MAX_WATCHLIST_LEVEL_1)
    }

    // Members with 0 or more referrals, but not more than 2.
    if (membershipStatusByReferral === 'level_0') {
        return (watchlistCount <= MAX_WATCHLIST_LEVEL_0)
    }

    // Fallback.
    return (watchlistCount <= MAX_WATCHLIST_LEVEL_0);

}

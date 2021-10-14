import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_PUBLIC_URL, process.env.SUPABASE_SERVICE_KEY);

/**
 * Will update the total referrals this subscriber has.
 *
 * @param {string} email Email of the Sparkloop/ConvertKit subscriber.
 * @param {number} totalRefs Total referrals this subscriber has.
 * @returns
 */
const updateTotalReferrals = async (emailSub, totalRefs) => {
    return await supabase.from('profiles').update({ referrals: totalRefs }).match({ email: emailSub })
}


/**
 * Will bump up the user limits on the app.
 * Rewards are specificed in Sparkloop and
 *
 * @see https://dash.sparkloop.app/campaigns/MFe09c669db9/rewards
 * @param {stromg} email Email of the Sparkloop/ConvertKit subscriber.
 * @param {object} reward Object with the reward.
 * @returns promise
 */
const updateReferralRewards = async (email, reward) => {
    const { id } = reward.id;
    let hasUnlimitedProjects = false;
    let canAddWatchlist = 1;

    if (reward.id === 'reward_8ac7543557') { // Level one
        hasUnlimitedProjects = true
        canAddWatchlist = 3
    } else if (reward.id === 'reward_83875f6e95') {  // Level two
        hasUnlimitedProjects = true
        canAddWatchlist = 10
    } else if (reward.id === 'reward_cdebf4f013') {  // Level two
        hasUnlimitedProjects = true
        canAddWatchlist = 10
    } else { // Other rewards have nothing to do with app limits.
        return;
    }

    return await supabase.from('profiles').update({ watchlist_limit: canAddWatchlist, unlimited_projects: hasUnlimitedProjects }).match({ email })
}

export {
    updateTotalReferrals,
    updateReferralRewards
}
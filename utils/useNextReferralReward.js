import { supabase } from '@/plugins/supabase'

export async function useNextReferralReward(userId) {

    if (!userId) {
        throw new Error("Missing user ID.");
    }

    if (typeof userId !== "string") {
        throw new TypeError(`Expected user ID to be a string: ${userId}`);
    }

    const { error, data } = await supabase
        .from("profiles")
        .select('referrals')
        .eq("id", userId)
        .limit(1)
        .maybeSingle();

    if (error) {
        throw error;
    }

    const refs = Number(data.referrals)

    if (refs >= 10 && refs <= 24) {
        return 25 - refs;
    } else if (refs >= 3 && refs <= 9) {
        return 10 - refs;
    } else {
        return 3 - refs;
    }
}

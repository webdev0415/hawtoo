import { supabase } from '@/plugins/supabase'

export async function useMembershipStatusByReferrals() {
    const user = supabase.auth.user();

    if (!user) {
        throw new Error("User is unauthenticated.");
    }

    const { error, data: member } = await supabase
        .from("profiles")
        .select('referrals, verified')
        .eq("id", user.id)
        .limit(1)
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (member.verified) {
        return 'verified'
    } else if (member.referrals >= 25) {
        return 'level_3'
    } else if (member.referrals >= 10 && member.referrals <= 24) {
        return 'level_2'
    } else if (member.referrals >= 3 && member.referrals <= 9) {
        return 'level_1'
    } else {
        return 'level_0'
    }
}

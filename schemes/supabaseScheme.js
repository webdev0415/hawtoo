/* eslint-disable no-console */
import { LocalScheme } from '~auth/runtime'

const isDev = process.env.NODE_ENV !== "production";

export default class SupabaseScheme extends LocalScheme {
    async fetchUser() {
        const supabase = await this.$auth.ctx.$supabase.auth

        if (!supabase.user()) {
            if (isDev) {
                console.log('User logged out 🛑');
            }

            return
        }

        if (isDev) {
            console.log('User logged in 🙌');
        }

        this.$auth.setUser(supabase.user())
    }

    async logout() {
        const supabase = this.$auth.ctx.$supabase.auth

        await supabase.signOut()

        return this.$auth.reset()
    }

    reset() {
        this.$auth.setUser(false)
    }

    async login(options) {
        const supabase = this.$auth.ctx.$supabase.auth
        const { user, error } = await supabase.signIn(options)

        if (error) {
            this.$auth.callOnError(error)
            return Promise.reject(error)
        }

        if (isDev) {
            console.log('Magic link sent 🙌');
        }


        this.$auth.setUser(user)
    }

    check() {
        const supabase = this.$auth.ctx.$supabase.auth

        const response = {
            valid: supabase.user() !== undefined,
            tokenExpired: false
        }

        return response
    }
}
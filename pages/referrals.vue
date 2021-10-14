<template>
  <main class="">
    <client-only>

      <div class="pt-16 pb-20 bg-white lg:pt-24 lg:pb-28">
        <div class="relative ">

          <div class="max-w-lg mx-auto py-14 lg:max-w-7xl">
            <div class="text-center">
              <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                You're only <span data-ambassador-next-reward></span> referral(s) away from your next reward
              </h2>
              <p class="max-w-md mx-auto mt-3 mb-4 text-2xl text-gray-500 sm:mt-4">
                You have <span data-ambassador-referrals></span> referral(s). Share the url with your friends to unlock perks 💎
              </p>
              <div class="w-full max-w-2xl mx-auto">
                <div class="flex items-center justify-center">
                  <div id="ambassador-sharing" class="w-full" data-ambassador-sharing></div>
                </div>
              </div>
            </div>
          </div>

          <div class="container px-8 bg-black rounded-lg py-14">
            <h3 class="text-2xl font-extrabold tracking-tight text-center text-white">
              Here are the rewards you can unlock
            </h3>
            <div class="grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
              <div v-for="(level, id) in levels" :key="id">

                <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {{ level.name }}
                </span>

                <div class="block mt-4">
                  <p class="mb-3 text-xl font-semibold text-white">
                    {{ level.title }}
                  </p>
                  <ul role="list">
                    <li v-for="reward in level.rewards" :key="reward" class="text-gray-300 divide-y divide-gray-200">
                      <div class="flex py-2 space-x-3">
                        <div v-tooltip="`Reward ${level.name}`" class="flex items-center justify-center w-8 h-8 mx-1 my-auto text-green-400 bg-gray-700 rounded-full fill-current">
                          <img src="~/assets/images/icons/check.svg" height="24" width="24" class="block h-4 m-auto text-green-300 cursor-pointer fill-current" />
                        </div>
                        <div class="flex items-center justify-center space-y-1">
                          <h3 class="text-base font-medium">{{ reward }}</h3>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </client-only>
  </main>
</template>

<script>
export default {
  async asyncData({ $supabase, route, store }) {
    const user = await store.state.auth.user
    const email = user.email

    return {
      email,
      levels: {
        level_1: {
          name: 'Level 1',
          title: 'Refer 3 people to unlock the following rewards',
          rewards: [
            'Add Unlimited projects to your Watchlist(s)',
            'Create up to 3 different Watchlists',
            'Get the "Ambassador Ape" Role on Discord 🐵'
          ]
        },
        level_2: {
          name: 'Level 2',
          title: 'Refer 10 people to unlock the following rewards',
          rewards: [
            'Everything from level 1 and:',
            'Create up to 10 different Watchlists ',
            'Get the "Alpha Ape" Role on Discord 🦍'
          ]
        },
        level_3: {
          name: 'Level 3',
          title: 'Refer 25 people to unlock the following rewards',
          rewards: [
            'Everything from level 2 + 3 and:',
            'Get the "Elite Ape Role" on Discord 🐺',
            '+ first access to new upcoming features and perks'
          ]
        }
      }
    }
  },
  created() {
    /**
     * In order to display the correct info, you need to
     * tell SparkLoop which subscriber is visiting the page.
     * All you need to do is to add a rh_subscriber parameter to the
     * URL of your referral hub page whose value is the subscriber's SparkLoop ID.
     * @see https://support.sparkloop.app/product/features/referral-hub-page/widgets#how-it-works
     */
    this.$router.push({
      query: { rh_subscriber: this.email }
    })
  }
}
</script>

<style lang="scss">
#ambassador-sharing #sl-social-links-container .sl-sharing-social {
  width: 35px;
  height: 35px;
}
</style>

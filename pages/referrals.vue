<template>
  <div>
    <client-only>
      You have <span data-ambassador-referrals></span> referrals
      <div data-ambassador-sharing></div>
    </client-only>
  </div>
</template>

<script>
export default {
  async asyncData({ $supabase, route, store }) {
    const user = await store.state.auth.user
    const email = user.email

    return {
      email
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

<style lang="scss" scoped>
</style>

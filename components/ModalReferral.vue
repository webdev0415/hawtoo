<template>
  <Modal :showing="getReferralModal.open" :css="{ 'modal': 'max-w-lg bg-black' }" @close="closeModal">
    <div class="max-w-sm">
      <h1 class="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
        {{ message.title }}
      </h1>
      <h2 class="mt-8 mb-12 text-3xl font-semibold leading-10 text-white ">
        {{ message.desc }}
      </h2>
    </div>
    <div class="flex flex-col items-center p-0 mt-10 text-black">
      <AppButton to="/referrals" variant="white" class="w-full">View rewards</AppButton>
    </div>
  </Modal>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { useNextReferralReward } from '@/utils/useNextReferralReward'
import AppButton from '@/components/AppButton'

export default {
  components: {
    AppButton
  },
  data() {
    return {
      totalRefs: 0,
      loading: false,
      disableButton: this.disabled,
      submittedEmailForm: false
    }
  },
  async fetch() {
    this.totalRefs = await useNextReferralReward(this.user.id)
  },
  computed: {
    ...mapGetters({
      getReferralModal: 'general/referralModal',
      user: 'auth/user'
    }),
    message() {
      switch (this.getReferralModal.intent) {
        case 'create_watchlist':
          return {
            title: `Refer friends to create more watchlists.`,
            desc: `You're only ${this.totalRefs} invites away from unlocking the next reward.`
          }
        default:
          return {
            title: `Refer friends to unlock more powerful features.`,
            desc: `You're only ${this.totalRefs} invites away from unlocking the next reward.`
          }
      }
    }
  },
  methods: {
    ...mapMutations({
      toggleReferralModal: 'general/TOGGLE_REFERRAL_MODAL'
    }),
    closeModal() {
      this.toggleReferralModal({
        open: false,
        intent: ''
      })
    },
    reEnterEmail() {
      this.submittedEmailForm = false
    }
  }
}
</script>
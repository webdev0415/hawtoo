<template>
  <div>
    <div class="max-w-lg mx-auto mb-6 text-center">
      <div class="p-4 border-l-4 border-yellow-400 bg-yellow-50">
        <div class="flex items-center justify-center">
          <div class="flex-shrink-0">
            <!-- Heroicon name: solid/exclamation -->
            <svg class="w-5 h-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-yellow-700 ">
              This project is not verified yet.
              <a href="#" class="font-medium text-yellow-700 underline hover:text-yellow-600" @click="openModal">
                Click for more information.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Modal :showing="show" :css="{ 'modal': 'max-w-lg' }" @close="closeModal">
      <div class="px-4 py-5 sm:p-6">

        <h3 class="font-medium leading-6 text-gray-900">
          Thread carefully!
        </h3>
        <div class="mt2">
          <div class="max-w-xl text-gray-500">
            <div class="prose">
              <p>Anyone with an account on HawToo can submit a project. Always double check the contract and DYOR.</p>
              <p>If a project is unverified, this means there's a chance that the information on this page might be incorrect.</p>
            </div>
            <div class="p-4 mt-4 text-gray-900 bg-gray-100 ">
              <div class="prose">
                <h4>Are you the owner of this project?</h4>
                <p>You can claim this project by heading over to the "#create-a-ticket" channel in the HawToo discord.</p>
                <p>After we verify that this project belongs to you, it will be transferred to your HawToo account so that you can manage it.</p>
              </div>
              <AppButton to="https://discord.gg/WGGmd392DW" href variant="primary" size="small" target="_blank" class="w-full mt-3">Reach out to us on Discord</AppButton>
            </div>
          </div>
        </div>

      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    openModal() {
      this.show = true
    },
    closeModal() {
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
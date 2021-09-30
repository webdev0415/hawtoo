<template>
  <main class="flex flex-col flex-grow min-h-screen overflow-hidden">
    <section class="max-w-6xl px-4 mx-auto sm:px-6 pt-8 sm:pt-14 ">
      <h1 class="dark:text-white mb-5">Onboarding - You are new user.</h1>
      <p class="dark:text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore tenetur
        odit repellendus repudiandae? Cum fuga, consequatur eius assumenda
        provident suscipit magnam facilis commodi, iure natus, ipsum
        exercitationem cupiditate quia laborum?
      </p>
    </section>
  </main>
</template>

<script>
export default {
  name: 'Onboarding',
  layout: 'empty',
  mounted() {
    console.log('onboardin mount')
    this.$store.commit("setIsNewUser", false)
  }
}
</script>

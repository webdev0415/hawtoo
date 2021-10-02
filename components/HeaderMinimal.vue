<template>
  <header class="absolute z-50 w-full text-gray-600 bg-transparent body-font">
    <div class="">
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div class="hidden lg:flex"></div>
        <div class="relative flex items-center justify-center px-6 py-5 space-x-3 text-center ">
          <Logo width="160px" />
        </div>
        <div class="relative items-center justify-end hidden px-6 py-5 space-x-3 lg:flex ">
          <NuxtLink class="font-bold text-gray-300 underline border-0 outline-none" to="/connect">Already a member? Login here</NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>
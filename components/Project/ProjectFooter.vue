<template>
  <footer class="px-4 pt-12 pb-8 overflow-hidden sm:pt-6 lg:pt-8">
    <div>
      <div class="flex flex-col flex-wrap justify-center " aria-label="Footer">
        <NuxtLink to="/">
          <Logo width="120px" class="mx-auto" />
        </NuxtLink>

        <p class="max-w-md mx-auto mt-3 text-base text-center text-gray-400">
          👋 Got a blockchain project and want a cool looking page like this for free?
          <NuxtLink to="/signup" class="font-medium underline text-neutral">
            Sign up here
          </NuxtLink>
        </p>

        <div class="mx-auto mt-4">
          <DarkModeToggle />
        </div>
      </div>
    </div>
  </footer>
</template>
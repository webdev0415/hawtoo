<template>
  <div>
    <!-- Page heading -->
    <header class="py-8 bg-gray-50">
      <div class="container px-4 mx-auto sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
        <div class="flex-1 min-w-0">
          <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Dashboard
          </h1>
        </div>
        <div class="flex mt-5 xl:mt-0 xl:ml-4">
          <span class="hidden sm:block">
            <button type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500">
              <!-- Heroicon name: solid/pencil -->
              <svg class="w-5 h-5 mr-2 -ml-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit
            </button>
          </span>

          <span class="hidden ml-3 sm:block">
            <button type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500">
              <!-- Heroicon name: solid/link -->
              <svg class="w-5 h-5 mr-2 -ml-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
              </svg>
              View
            </button>
          </span>

          <span class="relative z-0 sm:ml-3">
            <div>
              <label id="listbox-label" class="sr-only">
                Change published status
              </label>
              <div class="relative">
                <div class="inline-flex divide-x divide-purple-600 rounded-md shadow-sm">
                  <AppButton variant="primary" to="/account/submit-project">Submit your project</AppButton>
                </div>
              </div>
            </div>
          </span>

          <!-- Dropdown -->
          <span class="relative ml-3 sm:hidden">
            <button type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500" id="mobile-menu-button" aria-expanded="false" aria-haspopup="true">
              More
              <!-- Heroicon name: solid/chevron-down -->
              <svg class="w-5 h-5 ml-2 -mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>

            <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-200"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          -->
            <div class="absolute right-0 w-48 py-1 mt-2 -mr-1 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="mobile-menu-button" tabindex="-1">
              <!-- Active: "bg-gray-100", Not Active: "" -->
              <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="mobile-menu-item-0">Edit</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="mobile-menu-item-1">View</a>
            </div>
          </span>
        </div>
      </div>
    </header>

    <main class="max-w-lg px-4 pt-10 pb-12 mx-auto lg:pb-16">
      <NuxtChild />
    </main>
  </div>
</template>

<script>
export default {
  head: {
    bodyAttrs: {
      class:
        'tracking-semitight min-w-xs min-h-screen antialiased bg-gray-200 dark:bg-black'
    }
  }
}
</script>
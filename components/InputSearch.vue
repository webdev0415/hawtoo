<template>
  <div>
    <autocomplete :search="search" :get-result-value="getResultValue" auto-select :debounce-time="450" placeholder="Find a project" aria-label="Find a project" @submit="handleSubmit">
      <template #result="{ result, props }">
        <li v-bind="props" class="box-border flex flex-row items-center justify-center flex-shrink-0 w-full h-16 px-2 mx-auto my-0 font-sans text-black rounded-lg cursor-pointer">
          <div class="flex flex-col items-center justify-center flex-shrink-0 w-10 h-10 m-auto text-black bg-transparent rounded-lg">
            <div class="relative w-10 h-10 cursor-pointer">
              <div class="absolute block w-10 h-10 shadow-xs" style="border-radius: 22.5%;">
                <div class="box-border relative inline-block max-w-full m-0">
                  <ProjectAvatar :key="result.id" :verified="result.verified" :size="40" :size-badge="20" :name="result.name" :avatar-color="result.avatar_color" :avatar-name="result.avatar_name" :slug="result.slug" />
                </div>
              </div>
            </div>
          </div>
          <div class="box-border flex flex-col items-center justify-center w-full h-full px-3 py-0 mx-auto my-0 text-black">
            <div class="w-full text-sm font-medium">
              {{ result.name }}
            </div>
            <div class="w-full text-xs font-medium text-gray-600">
              {{ result.description | strLimit(42)}}
            </div>
          </div>
          <div class="flex flex-col items-center justify-center flex-shrink-0 w-10 h-10 m-auto text-black rounded-lg">
            <img src="~/assets/images/icons/arrow-up-right.svg" height="24" width="24" class="flex-grow-0 flex-shrink-0 block h-5 m-auto cursor-pointer" />
          </div>
        </li>
      </template>
    </autocomplete>
    <div v-if="helperMessage" class="p-[12px] text-center text-sm text-gray-500">
      {{ helperMessage }}
    </div>
    <div v-if="noResults" class="flex-row items-center justify-center p-8 text-center bg-white">
      <h2 class="mb-2 font-semibold text-gray-900 text-md">No results found?</h2>
      <p class="mb-2 text-sm">We can’t find "<span class="inline-block underline">{{ value }}</span>". Perhaps this NFT is not on HawToo yet. Do you want us to add it?</p>

      <form class="mt-4 mb-3 sm:flex sm:justify-center">
        <label for="opensea-slug" class="sr-only">OpenSea slug</label>
        <input v-model="openseaURL" name="opensea_url" type="url" autocomplete="off" required="true" class="w-full px-5 py-3 placeholder-gray-500 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs" placeholder="e.g. https://opensea.io/collection/cyberkongz">
        <div class="mt-3 sm:mt-0 sm:ml-3 sm:flex-shrink-0">
          <button type="submit" class="inline-flex items-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md shadow hover:bg-gray-700 focus:border-gray-700 active:bg-gray-700" :disabled="formLoading" @click="handleRequestBtn">
            <svg v-if="formLoading" class="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Request this NFT
          </button>
        </div>
      </form>
      <p class="mt-2 text-sm text-red-500">Only OpenSea is supported at the moment</p>
    </div>
  </div>
</template>

<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Autocomplete
  },
  data() {
    return {
      value: '',
      results: [],
      openseaURL: '',
      formLoading: false
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/loggedIn',
      user: 'auth/user'
    }),
    noResults() {
      console.log(this.results)

      return this.value.length >= 3 && this.results.length === 0
    },
    helperMessage() {
      if (this.value.length === 2) {
        return 'Enter at least 3 characters to perform a search'
      }

      return ''
    }
  },
  methods: {
    search(input) {
      this.value = input

      if (input.length < 1) {
        this.results = []
        return []
      }

      const search = this.$supabase
        .from('projects')
        .select()
        .textSearch('fts', `${input}:*`)

      return new Promise((resolve) => {
        if (input.length < 3) {
          this.results = []
          return resolve([])
        }

        search.then((res) => {
          console.log(res.data)
          if (res.data) {
            this.results = res.data
            resolve(this.results)
          } else {
            this.results = []
            resolve([])
          }
        })
      })
    },

    getResultValue(result) {
      return result.name
    },

    handleSubmit(result) {
      this.$emit('selected-item')
      this.$router.push(`/@${result.slug}`)
    },

    handleRequestBtn() {
      if (!this.isAuthenticated) {
        alert(
          `Please login to submit a request. We will notify you when it's added`
        )
        return
      }

      if (!this.openseaURL) {
        alert('You need to provide an OpenSea URL')
        return
      }

      this.formLoading = true

      this.$axios
        .post('api/request-project', {
          email: this.user.email,
          userId: this.user.id,
          url: this.openseaURL,
          searchQuery: this.value
        })
        .then((res) => {
          this.$toast.success(
            'Thanks! We will notify you once we add thi sproject',
            {
              position: 'top'
            }
          )
        })
        .catch((err) => {
          this.$toast.error(err)
        })
        .finally(() => {
          this.results = []
          this.value = ''
          this.formLoading = false
        })
    }
  }
}
</script>

<style>
.autocomplete-input-no-results.autocomplete-input-focused {
  border-bottom-color: transparent;
  border-radius: 8px 8px 0 0;
}

.autocomplete-input {
  border: 1px solid #eee;
  /* border-radius: 8px 8px 0 0; */
  border-radius: 8px;
  width: 100%;
  padding: 12px 12px 12px 48px;
  box-sizing: border-box;
  position: relative;
  font-size: 16px;
  line-height: 1.5;
  flex: 1;
  background-color: #fff;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjxwYXRoIGQ9Ik0yMSAyMWwtNC00Ii8+PC9zdmc+');
  background-repeat: no-repeat;
  background-position: 12px;
}

.autocomplete-input:focus,
.autocomplete-input[aria-expanded='true'] {
  border-color: rgba(0, 0, 0, 0.12);
  background-color: #fff;
  outline: none;
  /* box-shadow: 0 2px 2px rgba(0, 0, 0, 0.16); */
}

[data-position='below'] .autocomplete-input[aria-expanded='true'] {
  border-bottom: 1px solid rgb(191, 191, 191);
  border-radius: 8px 8px 0 0;
}

[data-position='above'] .autocomplete-input[aria-expanded='true'] {
  border-top-color: transparent;
  border-radius: 0 0 8px 8px;
  z-index: 2;
}

.autocomplete[data-loading='true']:after {
  content: '';
  border: 3px solid rgba(0, 0, 0, 0.12);
  border-right-color: rgba(0, 0, 0, 0.48);
  border-radius: 100%;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  animation: rotate 1s linear infinite;
}

.autocomplete-result-list {
  margin: 0;
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding: 0;
  box-sizing: border-box;
  max-height: 296px;
  overflow-y: auto;
  background: #fff;
  list-style: none;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.16);
}

[data-position='below'] .autocomplete-result-list {
  margin-top: -1px;
  border-top-color: transparent;
  border-radius: 0 0 8px 8px;
  padding-bottom: 0;
}

[data-position='above'] .autocomplete-result-list {
  margin-bottom: -1px;
  border-bottom-color: transparent;
  border-radius: 8px 8px 0 0;
  padding-top: 0;
}

.autocomplete-result {
  cursor: default;
  padding: 12px 12px 12px 12px;
  /* background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2NjIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjxwYXRoIGQ9Ik0yMSAyMWwtNC00Ii8+PC9zdmc+'); */
  /* background-repeat: no-repeat;
  background-position: 12px; */
}

.autocomplete-result:hover,
.autocomplete-result[aria-selected='true'] {
  background-color: rgba(0, 0, 0, 0.06);
}

@keyframes rotate {
  0% {
    transform: translateY(-50%) rotate(0deg);
  }
  to {
    transform: translateY(-50%) rotate(359deg);
  }
}
</style>
<template>
  <div>
    <autocomplete :search="search" :get-result-value="getResultValue" auto-select :debounce-time="350" placeholder="Find a project" aria-label="Find a project" @submit="handleSubmit">
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
    <div v-if="noResults" class="p-16 text-center bg-gray-50">
      <h2 class="mb-2 font-semibold text-gray-900 text-md">No results found</h2>
      <p class="text-sm">We can’t find anything with that term at the moment, try searching something else.</p>
      <button class="btn btn-primary" @click="requestProject">Missing this project? Request it</button>
    </div>
  </div>
</template>

<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'

export default {
  components: {
    Autocomplete
  },
  data() {
    return {
      value: '',
      results: []
    }
  },
  computed: {
    noResults() {
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
          return resolve(this.results)
        }

        search.then((res) => {
          this.results = res.data
          resolve(this.results)
        })
      })
    },

    getResultValue(result) {
      return result.name
    },

    handleSubmit(result) {
      this.$router.push(`/@${result.slug}`)
    },

    requestProject() {
      console.log('Send rquest')
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
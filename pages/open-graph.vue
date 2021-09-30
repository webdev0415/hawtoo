<template>
  <client-only>
    <div class="border-[50px] border-gray-900 bg-gray-700 min-h-screen h-full w-full px-24 py-12 font-body flex flex-col justify-center opengraph-card-bg">
      <div>
        <Logo width="260px" fill="white" />
      </div>

      <div class="flex items-center flex-grow w-2/3 py-12">
        <div>
          <h2 class="font-extrabold text-white text-[80px] leading-none">
            {{ $route.query.title }}
          </h2>

          <div class="flex items-center mt-14">
            <div v-if="$route.query.authorImage" class="mr-6">
              <avatar :size="100" :size-badge="32" :verified="isVerified" :fullname="$route.query.authorName" :image="$route.query.authorImage" />
            </div>

            <div class="flex flex-col items-start">
              <div class="flex items-center">
                <p v-if="$route.query.authorName" class="text-4xl font-medium text-gray-50">
                  {{ $route.query.authorName }}
                </p>
                <p v-if="$route.query.authorNameBadge" class="ml-3 mt-1 text-[18px] text-gray-500">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full font-bold bg-blue-400 text-white">
                    {{ $route.query.authorNameBadge }}
                  </span>
                </p>
              </div>
              <p v-if="$route.query.authorNameDesc" class="text-[18px] text-gray-500">
                <span class="text-2xl font-normal text-gray-200">
                  {{ $route.query.authorNameDesc }}
                </span>
              </p>
            </div>
          </div>

        </div>
      </div>

      <div v-if="$route.query.slug" class="flex">
        <p class="mr-12 text-4xl text-gray-300">
          hawtoo.com/{{ $route.query.slug }}
        </p>
      </div>
    </div>
  </client-only>
</template>

<script>
import Logo from '~/components/Logo.vue'

// Test image
// http://localhost:3000/open-graph?slug=%40%2Fcyberkongz&verified=true&title=View%20CyberKongz%20Links,%20Stats%20And%20How%20To%20Buy&authorName=CyberKongz&authorNameBadge=NFT&authorNameDesc=Lives%20on%20OpenSea&authorImage=https%3A%2F%2Flh3.googleusercontent.com%2FLIpf9z6Ux8uxn69auBME9FCTXpXqSYFo8ZLO1GaM8T7S3hiKScHaClXe0ZdhTv5br6FE2g5i-J5SobhKFsYfe6CIMCv-UfnrlYFWOM4%3Ds130
// http://localhost:3000/open-graph?slug=/%40cyberkongz&title=View%20CyberKongz%20Links,%20Stats%20And%20How%20To%20Buy&authorImage=https%3A%2F%2Flh3.googleusercontent.com%2FLIpf9z6Ux8uxn69auBME9FCTXpXqSYFo8ZLO1GaM8T7S3hiKScHaClXe0ZdhTv5br6FE2g5i-J5SobhKFsYfe6CIMCv-UfnrlYFWOM4%3Ds130&authorName=CyberKongz&authorNameBadge=NFT&authorNameDesc=Some%20text%20goes%20here&verified=true

export default {
  components: {
    Logo
  },
  layout: 'empty',
  computed: {
    isVerified() {
      if (
        this.$route.query.verified === true ||
        this.$route.query.verified === 'true'
      ) {
        return true
      }

      return false
    }
  }
}
</script>

<style lang="postcss" scoped>
.opengraph-card-bg {
  background-image: linear-gradient(
    to right,
    rgb(26, 38, 65),
    rgb(31, 21, 59),
    rgb(14, 7, 44)
  );
}
</style>
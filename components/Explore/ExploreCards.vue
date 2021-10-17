<template>
  <section
    class="
      mb-10
      grid grid-cols-2
      sm:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      gap-7
      justify-items-center
    "
  >
    <button
      v-for="card in data"
      :key="card.id"
      class="
        rounded-lg
        overflow-hidden
        bg-gray-500
        text-white
        h-20
        w-full
        flex
        items-center
        justify-center
        capitalize
        bg-explore-categories
        cursor-pointer
        relative
      "
    >
      <div class="w-full h-full bg-black opacity-40 absolute z-0" />
      <span class="z-10">{{ card.name }}</span>
    </button>
  </section>
</template>

<script>
export default {
  name: 'ExploreCards',
  props: {
    data: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
}
</script>

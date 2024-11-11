<template>
  <dialog
    :open="open"
    @click.self="$emit('close')"
    class="fixed top-0 left-0 min-h-screen min-w-[100vw] bg-slate-950 bg-opacity-20 z-50"
  >
    <section
      class="fixed inline-flex flex-wrap justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-slate-800 p-2 w-11/12 h-fit max-w-96 max-h-96"
    >
      <button
        @click="$emit('close')"
        class="bg-red-500 w-8 h-8 rounded-xl absolute right-0 top-0"
      >
        ×
      </button>
      <div class="py-4">
        <button
          :key="index"
          v-for="(color, index) in colors"
          class="min-w-12 min-h-12 rounded-full border-4 m-2 flex-initial"
          :class="[
            color,
            selected === color
              ? 'border-white shadow-md shadow-slate-900'
              : 'border-transparent',
          ]"
          @click="$emit('selected', color)"
        />
      </div>
    </section>
  </dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ColorModal",
  props: {
    open: Boolean,
    selected: {
      type: String,
      default: "bg-yellow-400",
    },
  },
  emits: ["selected", "close"],
  data() {
    return {
      colors: [
        "bg-yellow-400",
        "bg-green-400",
        "bg-orange-400",
        "bg-red-400",
        "bg-purple-400",
        "bg-blue-400",
        "bg-gray-300",
        "bg-gray-900 text-white",
      ] as string[],
    };
  },
});
</script>

<style lang="postcss" scoped></style>

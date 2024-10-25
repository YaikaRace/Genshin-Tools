<template>
  <article class="min-h-screen w-full flex justify-center items-center">
    <div class="bg-slate-800 w-full px-8 py-24 rounded-3xl md:max-w-fit">
      <div class="flex justify-center mb-8">
        <font-awesome-icon
          icon="fa-solid fa-ban"
          class="text-white w-24 h-full"
        />
      </div>
      <h1 class="text-white text-5xl font-bold text-center">Not Found</h1>
      <p class="text-white text-lg text-center">
        The page you are looking for does not exist
      </p>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotFound",
});
</script>

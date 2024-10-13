<template>
  <div class="min-h-screen h-full w-10/12 mx-auto mt-8">
    <tierlist-component />
    <div class="grid grid-cols-2">
      <characters-draggable />
      <weapons-draggable />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CharactersDraggable from "./components/CharactersDraggable.vue";
import WeaponsDraggable from "./components/WeaponsDraggable.vue";
import TierlistComponent from "./components/TierlistComponent.vue";

export default defineComponent({
  name: "App",
  components: {
    CharactersDraggable,
    WeaponsDraggable,
    TierlistComponent,
  },
});
</script>

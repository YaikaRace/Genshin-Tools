<template>
  <div class="min-h-screen h-full w-10/12 mx-auto">
    <div
      class="flex min-h-32 border-white border-2"
      :key="tiers.indexOf(tier) + 1"
      v-for="tier in tiers"
      :tier-name="tier"
    >
      <div class="flex items-center min-h-full w-32 bg-yellow-500">
        <click-to-edit :value="tier" class="w-full" />
      </div>
      <tier-component class="w-full" />
    </div>
    <characters-draggable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CharactersDraggable from "./components/CharactersDraggable.vue";
import TierComponent from "./components/TierComponent.vue";
import ClickToEdit from "./components/ClickToEdit.vue";

export default defineComponent({
  name: "App",
  components: {
    CharactersDraggable,
    TierComponent,
    ClickToEdit,
  },
  data() {
    return {
      tiers: ["S", "A", "B", "F"],
      text: "Hello",
    };
  },
});
</script>

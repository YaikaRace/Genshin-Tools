<template>
  <div class="min-h-screen h-full w-10/12 mx-auto">
    <div id="tierlist">
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
    </div>
    <button
      @click.prevent="takeScreenshot"
      class="text-white text-lg bg-slate-500"
    >
      Screenshot
    </button>
    <button
      @click.prevent="deleteScreenshot"
      class="text-white text-lg bg-slate-500"
    >
      Delete Screenshot
    </button>
    <img :src="screenshot" alt="screenshot" v-show="screenshot != undefined" />
    <characters-draggable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CharactersDraggable from "./components/CharactersDraggable.vue";
import TierComponent from "./components/TierComponent.vue";
import ClickToEdit from "./components/ClickToEdit.vue";
// @ts-expect-error javascript
import * as domtoimage from "dom-to-image-more";

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
      screenshot: undefined,
    };
  },
  methods: {
    async takeScreenshot() {
      const el = document.getElementById("tierlist");
      domtoimage.toPng(el).then((dataURL: any) => {
        this.screenshot = dataURL;
      });
    },
    deleteScreenshot() {
      this.screenshot = undefined;
    },
  },
});
</script>

<template>
  <div class="min-h-screen h-full w-10/12 mx-auto mt-8">
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
    <div>
      <div class="my-6">
        <button
          @click.prevent="takeScreenshot"
          class="text-white text-lg bg-slate-700 p-2 border-white border-2 rounded-lg"
        >
          Screenshot
        </button>
        <button
          @click.prevent="deleteScreenshot"
          class="text-white text-lg bg-slate-700 p-2 border-white border-2 rounded-lg ml-4"
        >
          Delete Screenshot
        </button>
      </div>
      <img
        :src="screenshot"
        alt="screenshot"
        v-show="screenshot != ''"
        class="border-2 border-white my-6"
      />
    </div>
    <characters-draggable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CharactersDraggable from "./components/CharactersDraggable.vue";
import TierComponent from "./components/TierComponent.vue";
import ClickToEdit from "./components/ClickToEdit.vue";
import domtoimage from "dom-to-image-more";

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
      screenshot: "",
    };
  },
  methods: {
    async takeScreenshot() {
      const el = document.getElementById("tierlist");
      domtoimage
        .toPng(el, { bgcolor: "rgb(15 23 42)" })
        .then((dataURL: string) => {
          this.screenshot = dataURL;
        })
        .catch((err: Error) => {
          console.log(err);
        });
    },
    deleteScreenshot() {
      this.screenshot = "";
    },
  },
});
</script>

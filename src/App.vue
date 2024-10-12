<template>
  <div class="min-h-screen h-full w-10/12 mx-auto mt-8">
    <div id="tierlist">
      <draggable :list="tiers" group="tiers" item-key="id">
        <template #item="{ element }">
          <div class="flex min-h-32 min-w-full border-white border-2">
            <div class="w-32 bg-yellow-500">
              <button
                class="absolute bg-red-500 w-6 h-6 text-xs"
                @click.prevent="deleteTier(element)"
                v-if="!takingScreenshot"
              >
                X
              </button>
              <click-to-edit
                :value="element.name"
                class="w-full"
                @textChanged="(v: String) => (element.name = v)"
              />
            </div>
            <tier-component :list="element.nested" class="w-full" />
          </div>
        </template>
      </draggable>
      <div v-if="takingScreenshot" class="text-white text-center bg-red-700">
        Genshin Impact TierMaker by @YaikaRace
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
        <button
          @click.prevent="addTier"
          class="text-white text-lg bg-slate-700 p-2 border-white border-2 rounded-lg float-right"
        >
          Add Tier
        </button>
      </div>
      <img
        :src="screenshot"
        alt="screenshot"
        v-show="screenshot != ''"
        class="border-2 border-white my-6"
      />
    </div>
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
import TierComponent from "./components/TierComponent.vue";
import ClickToEdit from "./components/ClickToEdit.vue";
import domtoimage from "dom-to-image-more";
import draggable from "vuedraggable";

export default defineComponent({
  name: "App",
  components: {
    CharactersDraggable,
    TierComponent,
    ClickToEdit,
    WeaponsDraggable,
    draggable,
  },
  data() {
    return {
      tiers: [
        {
          id: 1,
          name: "S",
          nested: [],
        },
        {
          id: 2,
          name: "A",
          nested: [],
        },
        {
          id: 3,
          name: "B",
          nested: [],
        },
        {
          id: 4,
          name: "F",
          nested: [],
        },
      ],
      text: "Hello",
      screenshot: "",
      takingScreenshot: false,
    };
  },
  methods: {
    async takeScreenshot() {
      const el = document.getElementById("tierlist");
      if (!el) return;
      this.takingScreenshot = true;
      domtoimage
        .toPng(el, {
          bgcolor: "rgb(15 23 42)",
          copyDefaultStyles: false,
        })
        .then((dataURL: string) => {
          this.screenshot = dataURL;
          this.takingScreenshot = false;
        })
        .catch((err: Error) => {
          console.log(err);
        });
    },
    deleteScreenshot() {
      this.screenshot = "";
    },
    addTier() {
      this.tiers.push({
        id: this.tiers.length + 1,
        name: "Tier",
        nested: [],
      });
    },
    deleteTier(element: { id: number; name: string; nested: never[] }) {
      this.tiers.splice(this.tiers.indexOf(element));
    },
  },
});
</script>

<template>
  <div id="tierlist" class="h-full w-full">
    <draggable
      :list="tiers"
      group="tiers"
      tag="div"
      item-key="id"
      handle=".handle"
      delay="150"
      delay-on-touch-only="true"
      :animation="200"
      class="relative h-fit"
    >
      <template #header>
        <div
          contenteditable
          class="bg-white font-bold text-center text-2xl p-2 rounded-t-xl"
        >
          My Genshin Tierlist
        </div>
      </template>
      <template #item="{ element }">
        <div class="flex items-stretch border-white border-2 w-full h-full">
          <div class="w-20 md:w-32" :class="[colors[element.color]]">
            <button
              class="absolute bg-red-500 w-6 h-6 text-xs"
              @click.prevent="deleteTier(element)"
              v-if="!takingScreenshot"
            >
              X
            </button>
            <button
              class="absolute translate-y-6 bg-white w-6 h-6 text-xs"
              @click.prevent="changeColor(element)"
              v-if="!takingScreenshot"
            >
              <font-awesome-icon icon="fa-solid fa-eye-dropper" size="xs" />
            </button>
            <div class="min-h-20 h-full w-20 grow md:min-h-32 md:w-32 table">
              <div class="table-row">
                <div
                  contenteditable
                  class="table-cell align-middle text-center font-bold break-words p-4"
                >
                  {{ element.name }}
                </div>
              </div>
            </div>
          </div>
          <tier-component :list="element.nested" />
          <font-awesome-icon
            icon="fa-solid fa-arrows-up-down"
            v-if="!takingScreenshot"
            class="text-white handle my-auto mr-8 text-center w-4 h-full hover:cursor-move"
          />
        </div>
      </template>
    </draggable>
  </div>
  <div v-if="takingScreenshot" class="text-white text-center bg-red-700">
    Genshin Impact TierMaker by @YaikaRace
  </div>
  <div>
    <div class="my-6">
      <button
        @click.prevent="takeScreenshot"
        class="text-white text-base bg-slate-700 p-2 border-white border-2 rounded-lg"
      >
        Screenshot
      </button>
      <button
        @click.prevent="deleteScreenshot"
        class="text-white text-base bg-slate-700 p-2 border-white border-2 rounded-lg ml-4"
      >
        Delete Screenshot
      </button>
      <button
        @click.prevent="addTier"
        class="text-white text-base bg-slate-700 p-2 border-white border-2 rounded-lg float-right"
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
</template>
<script lang="ts">
import { defineComponent } from "vue";
import TierComponent from "./draggables/TierComponent.vue";
import draggable from "vuedraggable";
import domtoimage from "dom-to-image-more";

export default defineComponent({
  name: "TierlistComponent",
  components: {
    TierComponent,
    draggable,
  },
  data() {
    return {
      tiers: [
        {
          id: 1,
          name: "S",
          color: 0,
          nested: [],
        },
        {
          id: 2,
          name: "A",
          color: 1,
          nested: [],
        },
        {
          id: 3,
          name: "B",
          color: 2,
          nested: [],
        },
        {
          id: 4,
          name: "F",
          color: 3,
          nested: [],
        },
      ],
      colors: [
        "bg-yellow-500",
        "bg-green-500",
        "bg-orange-500",
        "bg-red-500",
        "bg-purple-500",
        "bg-blue-500",
        "bg-white",
        "bg-black",
      ] as string[],
      screenshot: "",
      takingScreenshot: false,
    };
  },
  methods: {
    async takeScreenshot() {
      const el = document.getElementById("tierlist");
      const scale = window.devicePixelRatio;
      if (!el) return;
      this.takingScreenshot = true;
      domtoimage
        .toPng(el, {
          bgcolor: "rgb(15 23 42)",
          copyDefaultStyles: false,
          width: 1920,
          height: 1080,
          style: {
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: "1920px",
            height: "1080px",
          },
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
        color: 0,
        nested: [],
      });
    },
    deleteTier(element: {
      id: number;
      name: string;
      color: number;
      nested: never[];
    }) {
      this.tiers.splice(this.tiers.indexOf(element), 1);
    },
    changeColor(element: {
      id: number;
      name: string;
      color: number;
      nested: never[];
    }) {
      if (element.color < this.colors.length - 1) {
        element.color++;
        return;
      }
      element.color = 0;
    },
  },
});
</script>

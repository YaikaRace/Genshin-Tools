<template>
  <section
    id="tierlist"
    class="h-full min-w-full bg-slate-800 relative max-h-fit"
  >
    <draggable
      :list="tiers"
      group="tiers"
      tag="div"
      item-key="id"
      handle=".handle"
      delay="150"
      delay-on-touch-only="true"
      :animation="200"
      class="relative h-fit min-w-full max-h-fit min-h-fit"
    >
      <template #header>
        <div
          contenteditable
          class="bg-white font-bold text-center text-2xl p-2 rounded-t-xl min-w-full"
        >
          My Genshin Tierlist
        </div>
      </template>
      <template #item="{ element }">
        <div
          class="flex items-stretch basis-3/4 border-white border-2 min-w-full h-full"
        >
          <div class="w-20 md:w-32" :class="[element.color]">
            <button
              data-html2canvas-ignore
              class="absolute bg-red-500 hover:bg-red-400 w-6 h-6 text-sm text-black"
              @click.prevent="deleteTier(element)"
            >
              ×
            </button>
            <button
              data-html2canvas-ignore
              class="absolute translate-y-6 bg-white hover:bg-gray-400 w-6 h-6 text-xs text-black"
              @click.prevent="element.modal = true"
            >
              <font-awesome-icon icon="fa-solid fa-eye-dropper" size="xs" />
            </button>
            <color-modal
              :selected="element.color"
              :open="element.modal"
              @selected="(v) => (element.color = v)"
              @close="element.modal = false"
            />
            <div class="min-h-20 h-full w-20 grow md:min-h-32 md:w-32 table">
              <div class="table-row">
                <contenteditable
                  contenteditable
                  tag="div"
                  v-model="element.name"
                  no-nl
                  class="table-cell align-middle text-center font-bold break-words p-4 max-w-20 md:max-w-32"
                />
              </div>
            </div>
          </div>
          <tier-component :list="element.nested" />
          <font-awesome-icon
            data-html2canvas-ignore
            icon="fa-solid fa-arrows-up-down"
            class="text-white handle my-auto mr-8 text-center w-4 h-full hover:cursor-move"
          />
        </div>
      </template>
    </draggable>
    <button
      @click.prevent="addTier"
      data-html2canvas-ignore
      class="text-black absolute left-1/2 -translate-x-1/2 -bottom-4 text-base text-center bg-white hover:bg-purple-600 p-2 h-10 w-10 rounded-full"
    >
      <font-awesome-icon
        icon="fa-solid fa-plus"
        class="w-full h-full text-black"
      />
    </button>
    <div
      class="absolute right-4 z-20 bottom-2 hidden opacity-60 text-gray-500 p-1 text-center"
      id="watermark"
    >
      Genshin Impact TierMaker by @YaikaRace - https://gitools.vercel.app
    </div>
  </section>
  <div>
    <div class="my-6">
      <button
        @click.prevent="takeScreenshot"
        :disabled="takingScreenshot"
        class="text-white min-w-12 text-base bg-slate-700 disabled:bg-slate-900 disabled:text-gray-400 hover:bg-purple-600 p-2 border-white border-2 rounded-lg"
      >
        <span v-if="!takingScreenshot"
          ><font-awesome-icon
            icon="fa-solid fa-camera"
            class="max-h-full w-full"
        /></span>
        <span v-else class="h-full"
          ><font-awesome-icon
            icon="fa-solid fa-spinner"
            spin-pulse
            class="max-h-full"
        /></span>
      </button>
      <a
        v-if="screenshot"
        :href="screenshot"
        download="tierlist"
        class="text-white inline-block text-center min-w-12 text-base bg-slate-700 disabled:bg-slate-900 disabled:text-gray-400 hover:bg-purple-600 p-2 border-white border-2 rounded-lg ml-4"
        ><font-awesome-icon icon="download" class="max-h-full"
      /></a>
      <button
        v-if="screenshot"
        @click.prevent="deleteScreenshot"
        :disabled="takingScreenshot"
        class="text-white min-w-12 text-base bg-slate-700 disabled:bg-slate-900 disabled:text-gray-400 hover:bg-purple-600 p-2 border-white border-2 rounded-lg ml-4"
      >
        <font-awesome-icon icon="trash" class="max-h-full" />
      </button>
      <button
        v-if="screenshot"
        @click.prevent="deleteScreenshot"
        :disabled="takingScreenshot"
        class="text-white min-w-12 text-base bg-slate-700 disabled:bg-slate-900 disabled:text-gray-400 hover:bg-purple-600 p-2 border-white border-2 rounded-lg ml-4"
      >
        <font-awesome-icon icon="save" class="max-h-full" />
      </button>
      <div
        v-if="screenshot && !loggedIn"
        class="absolute inline-block bg-gray-300 p-2 rounded-lg ml-4 after:content-[''] after:absolute after:w-0 after:h-0 after:left-0 after:top-1/2 after:border-8 after:border-transparent after:border-r-gray-300 after:-ml-4"
      >
        You have to Sign In or Sign Up
      </div>
    </div>
    <div v-if="screenshot" class="w-full border-2 border-white my-6 p-4">
      <img :src="screenshot" alt="screenshot" class="w-full" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import TierComponent from "./draggables/TierComponent.vue";
import draggable from "vuedraggable";
import ColorModal from "./modals/ColorModal.vue";
import html2canvas from "html2canvas";
import { mapState } from "vuex";
import contenteditable from "vue-contenteditable";

export default defineComponent({
  name: "TierlistComponent",
  components: {
    TierComponent,
    draggable,
    ColorModal,
    contenteditable,
  },
  data() {
    return {
      tiers: [
        {
          id: 1,
          name: "S",
          color: "bg-yellow-400",
          nested: [],
          modal: false,
        },
        {
          id: 2,
          name: "A",
          color: "bg-green-400",
          nested: [],
          modal: false,
        },
        {
          id: 3,
          name: "B",
          color: "bg-orange-400",
          nested: [],
          modal: false,
        },
        {
          id: 4,
          name: "F",
          color: "bg-red-400",
          nested: [],
          modal: false,
        },
      ],
      screenshot: "",
      takingScreenshot: false,
    };
  },
  computed: {
    ...mapState(["loggedIn"]),
  },
  methods: {
    async takeScreenshot() {
      const el = document.getElementById("tierlist");
      if (!el) return;
      this.takingScreenshot = true;
      const height = el.offsetHeight;
      html2canvas(el, {
        windowWidth: 1120,
        windowHeight: height,
        useCORS: true,
        logging: false,
        onclone: (_document, element) => {
          element.style.minWidth = "100vw";
          element.style.position = "fixed";
          element.style.right = "0";
          element.style.top = "0";
          const children = element.children;
          for (const child of children) {
            child.classList.remove("hidden");
          }
        },
      })
        .then((canvas) => {
          const dataURL = canvas.toDataURL();
          this.screenshot = dataURL;
          this.takingScreenshot = false;
        })
        .catch(() => {
          console.log("Error taking screenshot");
        });
    },
    deleteScreenshot() {
      this.screenshot = "";
    },
    addTier() {
      this.tiers.push({
        id: this.tiers.length + 1,
        name: "Tier",
        color: "bg-yellow-400",
        nested: [],
        modal: false,
      });
    },
    deleteTier(element: {
      id: number;
      name: string;
      color: string;
      nested: never[];
      modal: boolean;
    }) {
      this.tiers.splice(this.tiers.indexOf(element), 1);
    },
  },
});
</script>

<template>
  <section
    id="tierlist"
    ref="tierlist"
    class="h-full min-w-full bg-slate-800 relative max-h-fit"
  >
    <div class="h-full w-full relative">
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
        :disabled="readonly"
      >
        <template #header>
          <contenteditable
            :contenteditable="!readonly"
            tag="div"
            no-nl
            v-model="(tiers[0] as {name}).name"
            class="bg-white font-bold text-center text-2xl p-2 rounded-t-xl min-w-full"
          />
        </template>
        <template #item="{ element }">
          <div
            v-if="element.id !== 0"
            class="flex items-stretch basis-3/4 border-white border-2 min-w-full h-full"
          >
            <div class="w-20 md:w-32" :class="[element.color]">
              <button
                v-if="!readonly"
                data-html2canvas-ignore
                class="absolute bg-red-500 hover:bg-red-400 w-6 h-6 text-sm text-black"
                @click.prevent="deleteTier(element)"
              >
                ×
              </button>
              <button
                v-if="!readonly"
                data-html2canvas-ignore
                class="absolute translate-y-6 bg-white hover:bg-gray-400 w-6 h-6 text-xs text-black"
                @click.prevent="element.modal = true"
              >
                <font-awesome-icon icon="fa-solid fa-eye-dropper" size="xs" />
              </button>
              <color-modal
                :selected="element.color"
                :open="element.modal"
                @selected="(v: string) => (element.color = v)"
                @close="element.modal = false"
              />
              <div class="min-h-20 h-full w-20 grow md:min-h-32 md:w-32 table">
                <div class="table-row">
                  <contenteditable
                    :contenteditable="!readonly"
                    tag="div"
                    v-model="element.name"
                    no-nl
                    class="table-cell align-middle text-center font-bold break-words p-4 max-w-20 md:max-w-32"
                  />
                </div>
              </div>
            </div>
            <tier-component :disabled="readonly" :list="element.nested" />
            <font-awesome-icon
              v-if="!readonly"
              data-html2canvas-ignore
              icon="fa-solid fa-arrows-up-down"
              class="text-white handle my-auto mr-8 text-center w-4 h-full hover:cursor-move"
            />
          </div>
        </template>
      </draggable>
      <button
        v-if="!readonly"
        @click.prevent="addTier"
        data-html2canvas-ignore
        class="text-black absolute left-1/2 -translate-x-1/2 -bottom-4 text-base text-center bg-white hover:bg-purple-600 p-2 h-10 w-10 rounded-full"
      >
        <font-awesome-icon
          icon="fa-solid fa-plus"
          class="w-full h-full text-black"
        />
      </button>
    </div>
    <div
      class="absolute right-4 z-20 bottom-2 hidden opacity-60 text-gray-500 p-1 text-center"
      id="watermark"
    >
      Genshin Impact TierMaker by @YaikaRace - https://gitools.vercel.app
    </div>
    <screen-shot
      data-html2canvas-ignore
      v-if="!readonly"
      :el="$refs.tierlist"
      @save="saveTierlist"
      @share="shareTierlist"
    />
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import TierComponent from "./draggables/TierComponent.vue";
import draggable from "vuedraggable";
import ColorModal from "./modals/ColorModal.vue";
import contenteditable from "vue-contenteditable";
import ScreenShot from "./ScreenShot.vue";

export default defineComponent({
  name: "TierlistComponent",
  components: {
    TierComponent,
    draggable,
    ColorModal,
    contenteditable,
    ScreenShot,
  },
  props: {
    readonlyTiers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      readonly: false,
      tiers: [
        {
          id: 0,
          name: "My Genshin Tierlist",
        },
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
      ] as unknown[],
    };
  },
  mounted() {
    if (this.readonlyTiers.length > 0) {
      this.tiers = this.readonlyTiers;
      this.readonly = true;
    }
  },
  methods: {
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
    saveTierlist() {
      window.sessionStorage.setItem("savedTier", JSON.stringify(this.tiers));
    },
    shareTierlist() {
      const encodedTierlist = btoa(JSON.stringify(this.tiers));
      const baseURL = window.location.origin;
      navigator.clipboard.writeText(
        `${baseURL}/tierlist/share/${encodedTierlist}`
      );
    },
  },
});
</script>

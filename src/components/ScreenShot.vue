<template>
  <section>
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
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import html2canvas from "html2canvas";
import { mapState } from "vuex";

export default defineComponent({
  name: "ScreenShot",
  data() {
    return {
      screenshot: "",
      takingScreenshot: false,
    };
  },
  props: ["el"],
  computed: {
    ...mapState(["loggedIn"]),
  },
  methods: {
    async takeScreenshot() {
      if (!this.el) return;
      this.takingScreenshot = true;
      html2canvas(this.el, {
        windowWidth: 1120,
        useCORS: true,
        logging: false,
        onclone(_document, element) {
          element.style.minWidth = "100vw";
          element.style.position = "fixed";
          element.style.right = "0";
          element.style.top = "0";
          const children = element.children;
          for (const child of children) {
            child.classList.remove("hidden");
          }
          const height = element.offsetHeight;
          this.windowHeight = height;
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
  },
});
</script>

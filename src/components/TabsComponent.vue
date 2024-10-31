<template>
  <article>
    <div class="flex translate-y-[2px]">
      <!-- @vue-ignore -->
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="{
          active: currentTab == tab.id,
          'tab-start': tab.id === 0,
          'tab-end': tab.id == tabs.length - 1,
        }"
        class="tab"
        @click.prevent="selectTab(tab)"
      >
        {{
          // @ts-ignore
          tab.title
        }}
      </button>
    </div>
    <div>
      <slot></slot>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Tab {
  id: number;
  title: string;
}

export default defineComponent({
  name: "TabsComponent",
  props: {
    tabs: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      currentTab: 0,
    };
  },
  methods: {
    selectTab(tab: Tab) {
      this.currentTab = tab.id;
      this.$emit("tab-selected", tab.id);
    },
  },
});
</script>

<style scoped lang="postcss">
.tab {
  @apply text-white text-lg bg-slate-900 hover:bg-slate-700 p-2 border-white scale-[0.85];
}
.tab-start {
  @apply border-l-2 border-t-2 rounded-tl-lg origin-bottom-right translate-x-[2px];
}
.tab-end {
  @apply border-r-2 border-t-2 rounded-tr-lg origin-bottom-left -translate-x-[2px];
}
.active {
  @apply !bg-slate-800 scale-100 translate-x-0 rounded-lg rounded-b-none;
}
</style>

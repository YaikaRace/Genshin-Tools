<template>
  <div>
    <!-- @vue-ignore -->
    <button
      v-for="tab in tabs"
      :key="tab.id"
      :class="{ active: currentTab == tab.id, disabled: currentTab != tab.id }"
      @click.prevent="selectTab(tab)"
    >
      {{
        // @ts-ignore
        tab.title
      }}
    </button>
    <div>
      <slot></slot>
    </div>
  </div>
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
.disabled,
.active {
  @apply text-white text-lg bg-slate-800 p-2 border-white border-2 rounded-lg;
}
.active {
  @apply !bg-slate-500;
}
</style>

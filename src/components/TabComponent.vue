<template>
  <div class="w-full h-full" v-show="active">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TabComponent",
  props: {
    title: {
      type: String,
      default: "Tab",
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

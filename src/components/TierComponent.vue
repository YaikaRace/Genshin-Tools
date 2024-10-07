<template>
  <draggable
    :list="list"
    item-key="id"
    tag="div"
    :group="{
      name: 'tier',
      pull: true,
      put: ['characters', 'weapons', 'tier'],
    }"
    class="min-h-32 flex flex-wrap"
    chosen-class="chosen"
  >
    <template #item="{ element }">
      <div class="hover:cursor-move">
        <img
          :src="`https://genshin.jmp.blue/characters/${element}/icon`"
          :alt="`${element}-icon`"
          class="inline h-32"
        />
      </div>
    </template>
  </draggable>
</template>

<style lang="postcss">
.chosen {
  @apply opacity-50;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import draggable from "vuedraggable";

export default defineComponent({
  name: "TierComponent",
  components: {
    draggable,
  },
  props: {
    tierName: {
      type: String,
      default: "S",
    },
  },
  data() {
    return {
      list: [],
    };
  },
});
</script>

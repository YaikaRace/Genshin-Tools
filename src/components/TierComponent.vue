<template>
  <draggable
    :list="list"
    item-key="id"
    tag="div"
    :group="{
      name: 'tier',
      pull: true,
      put: ['characters', 'weapons', 'tier'],
      accepts: ['character', 'weapon'],
    }"
    class="min-h-32 flex flex-wrap"
    chosen-class="chosen"
    delay="150"
    delay-on-touch-only="true"
    :move="onMove"
  >
    <template #item="{ element }">
      <div class="hover:cursor-move" v-if="element.type == 'character'">
        <img
          :src="`https://genshin.jmp.blue/characters/${element.name}/icon`"
          :alt="`${element.name}-icon`"
          class="inline h-32 max-w-32 min-w-32"
        />
      </div>
      <div class="hover:cursor-move" v-else>
        <img
          :src="`https://genshin.jmp.blue/weapons/${element.name}/icon`"
          :alt="`${element.name}-icon`"
          class="inline h-32 max-w-32 min-w-32"
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
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onMove(evt: any) {
      return evt.relatedContext.component.$attrs.group.accepts.includes(
        evt.draggedContext.element.type
      );
    },
  },
});
</script>

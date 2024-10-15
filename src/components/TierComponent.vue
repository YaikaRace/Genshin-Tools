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
      <div
        class="hover:cursor-move relative"
        v-if="element.type == 'character'"
        id="weapon-container"
      >
        <img
          :src="`https://genshin.jmp.blue/characters/${element.id.toLowerCase()}/icon`"
          :alt="`${element.id.toLowerCase()}-icon`"
          class="inline h-32 max-w-32 min-w-32"
        />
        <draggable
          :list="element.nested"
          :group="{
            name: 'weapons',
            put: ['tier', 'weapons'],
            accepts: ['weapon'],
          }"
          chosen-class="chosen"
          item-key="id"
          tag="div"
          class="h-12 w-12 absolute bottom-0 right-0"
        >
          <template #item="{ element }">
            <img
              :src="`https://genshin.jmp.blue/weapons/${element.id.toLowerCase()}/icon`"
              :alt="`${element.id}-icon`"
              class="h-12 w-12 p-1 bg-amber-600 rounded-md"
            />
          </template>
        </draggable>
      </div>
      <div class="hover:cursor-move" v-else>
        <img
          :src="`https://genshin.jmp.blue/weapons/${element.id.toLowerCase()}/icon`"
          :alt="`${element.id.toLowerCase()}-icon`"
          class="inline h-32 max-w-32 min-w-32"
        />
      </div>
    </template>
  </draggable>
</template>

<style lang="postcss" scoped>
.chosen {
  @apply opacity-50 h-32 w-32 bg-black;
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

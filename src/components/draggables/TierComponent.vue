<template>
  <div id="tier-container" class="w-full">
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
      class="h-full flex flex-wrap min-w-full"
      delay="150"
      delay-on-touch-only="true"
      :move="onMove"
      :animation="200"
      :disabled="disabled"
    >
      <template #item="{ element }">
        <div
          :class="{ 'hover:cursor-move': !disabled }"
          class="relative"
          v-if="element.type == 'character'"
        >
          <img
            :src="`https://genshin.jmp.blue/characters/${element.id.toLowerCase()}/icon`"
            :alt="`${element.id.toLowerCase()}-icon`"
            class="inline w-20 h-20 md:w-32 md:h-32"
          />
          <character-weapon-draggable
            :disabled="disabled"
            :list="element.nested"
          />
        </div>
        <div :class="{ 'hover:cursor-move': !disabled }" v-else>
          <img
            :src="`https://genshin.jmp.blue/weapons/${element.id.toLowerCase()}/icon`"
            :alt="`${element.id.toLowerCase()}-icon`"
            class="inline w-20 h-20 md:w-32 md:h-32"
          />
        </div>
      </template>
    </draggable>
  </div>
</template>

<style lang="postcss">
#tier-container .sortable-ghost {
  @apply opacity-50 h-20 w-20 md:h-32 md:w-32 bg-opacity-0;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import draggable from "vuedraggable";
import CharacterWeaponDraggable from "./CharacterWeaponDraggable.vue";

export default defineComponent({
  name: "TierComponent",
  components: {
    draggable,
    CharacterWeaponDraggable,
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
    disabled: {
      type: Boolean,
      default: false,
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

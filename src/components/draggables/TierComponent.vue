<template>
  <div id="tier-container" class="h-full w-full">
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
      class="min-h-32 flex flex-wrap w-full h-full flex-1"
      delay="150"
      delay-on-touch-only="true"
      :move="onMove"
      :animation="200"
    >
      <template #item="{ element }">
        <div
          class="hover:cursor-move relative"
          v-if="element.type == 'character'"
        >
          <img
            :src="`https://genshin.jmp.blue/characters/${element.id.toLowerCase()}/icon`"
            :alt="`${element.id.toLowerCase()}-icon`"
            class="inline w-32 h-32"
          />
          <character-weapon-draggable :list="element.nested" />
        </div>
        <div class="hover:cursor-move" v-else>
          <img
            :src="`https://genshin.jmp.blue/weapons/${element.id.toLowerCase()}/icon`"
            :alt="`${element.id.toLowerCase()}-icon`"
            class="inline h-32 w-32 min-w-32"
          />
        </div>
      </template>
    </draggable>
  </div>
</template>

<style lang="postcss">
#tier-container .sortable-ghost {
  @apply opacity-50 !h-32 !w-32 !bg-opacity-0;
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

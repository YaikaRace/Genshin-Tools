<template>
  <div id="weapon-container">
    <draggable
      :list="list"
      :group="{
        name: 'weapons',
        put: (to: any, from: any) => {
          return ['tier', 'weapons'].includes(from.options.group.name) && to.el.children.length == 0
        },
        accepts: ['weapon'],
      }"
      item-key="id"
      tag="div"
      class="h-12 w-12 absolute bottom-0 right-0"
      :animation="200"
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import draggable from "vuedraggable";

export default defineComponent({
  name: "CharacterWeaponDraggable",
  components: {
    draggable,
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
});
</script>

<style lang="postcss">
#weapon-container .sortable-ghost,
#weapon-container .sortable-chosen,
#weapon-container .sortable-drag {
  @apply opacity-50 !max-h-12 !max-w-12 bg-amber-600;
}
</style>

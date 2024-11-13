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
      class="h-12 w-12 md:h-16 md:w-16 absolute bottom-0 right-0"
      :animation="200"
      :disabled="disabled"
    >
      <template #item="{ element }">
        <img
          :src="`https://genshin.jmp.blue/weapons/${element.id.toLowerCase()}/icon`"
          :alt="`${element.id}-icon`"
          class="h-full w-full p-1 rounded-md weapon-icon"
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="postcss" scoped>
#weapon-container .sortable-ghost,
#weapon-container .sortable-chosen,
#weapon-container .sortable-drag {
  @apply opacity-50 !max-h-16 !max-w-16;
}
.weapon-icon {
  --color: rgb(245, 158, 11);
  filter: drop-shadow(0px 2px 0px var(--color))
    drop-shadow(-2px 0px 0px var(--color)) drop-shadow(2px 0px 0px var(--color))
    drop-shadow(0px -2px 0px var(--color));
}
</style>

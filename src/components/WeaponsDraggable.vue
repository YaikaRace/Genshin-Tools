<template>
  <draggable
    :list="weapons"
    tag="div"
    :group="{ name: 'weapons', put: ['tier'], accepts: ['weapon'] }"
    item-key="id"
    class="min-h-32 max-h-32 flex flex-wrap"
    chosen-class="chosen"
    delay="150"
    delay-on-touch-only="true"
    :move="onMove"
  >
    <template #item="{ element }">
      <div
        class="list-group-item hover:cursor-move flex w-32 max-w-32 max-h-32"
      >
        <!-- <div>{{ element }}</div> -->
        <img
          :src="`https://genshin.jmp.blue/weapons/${element.name}/icon`"
          :alt="`${element.name}-icon`"
          class="h-32 w-32 max-w-32 max-h-32"
        />
        <!-- <HelloWorld :list="element.nested" class="ml-2" /> -->
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
  name: "WeaponsDraggable",
  components: {
    draggable,
  },
  data() {
    return {
      weapons: [] as object[],
    };
  },
  async mounted() {
    const data = await fetch("https://genshin.jmp.blue/weapons/");
    const json = await data.json();
    for (const weapon of json) {
      const weaponObj = {
        type: "weapon",
        name: weapon,
      };
      this.weapons.push(weaponObj);
    }
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

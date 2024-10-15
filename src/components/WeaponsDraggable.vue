<template>
  <div id="weapons-draggable-container">
    <draggable
      :list="weapons"
      tag="div"
      :group="{
        name: 'weapons',
        put: ['tier', 'weapons'],
        accepts: ['weapon'],
      }"
      item-key="id"
      class="min-h-32 max-h-32 flex flex-wrap"
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
            :src="`https://genshin.jmp.blue/weapons/${element.id.toLowerCase()}/icon`"
            :alt="`${element.id.toLowerCase()}-icon`"
            class="h-32 w-32 max-w-32 max-h-32"
          />
          <!-- <HelloWorld :list="element.nested" class="ml-2" /> -->
        </div>
      </template>
    </draggable>
  </div>
</template>

<style lang="postcss">
#weapons-draggable-container .sortable-chosen {
  @apply opacity-50 bg-red-50;
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
    const weaponPromises = [];
    for (const weapon of json) {
      weaponPromises.push(fetch(`https://genshin.jmp.blue/weapons/${weapon}`));
    }
    const results = await Promise.allSettled(weaponPromises);
    const jsonPromises = [];
    for (const result of results) {
      if (result.status == "fulfilled") {
        jsonPromises.push(result.value.json());
      }
    }
    const jsonResults = await Promise.allSettled(jsonPromises);
    for (const weapon of jsonResults) {
      if (weapon.status == "rejected") return;
      const weaponObj = (({
        id,
        name,
        type,
      }: {
        id: string;
        name: string;
        type: string;
      }) => ({
        id,
        name,
        weaponType: type,
        type: "weapon",
      }))(weapon.value);
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

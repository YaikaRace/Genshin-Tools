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
      class="min-h-fit flex flex-wrap justify-center bg-slate-800 border-white border-2 rounded-lg p-4"
      delay="150"
      delay-on-touch-only="true"
      :move="onMove"
      :animation="200"
    >
      <template #item="{ element }">
        <div
          class="list-group-item hover:cursor-move flex w-20 h-20 max-w-32 max-h-32 md:w-32 md:h-32"
        >
          <!-- <div>{{ element }}</div> -->
          <img
            :src="`https://genshin.jmp.blue/weapons/${element.id.toLowerCase()}/icon`"
            :alt="`${element.id.toLowerCase()}-icon`"
            class="h-full w-full"
          />
          <!-- <HelloWorld :list="element.nested" class="ml-2" /> -->
        </div>
      </template>
    </draggable>
  </div>
</template>

<style lang="postcss">
#weapons-draggable-container .sortable-chosen {
  @apply bg-opacity-0 opacity-50 h-20 w-20 md:h-32 md:w-32;
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
    await this.getWeapons();
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onMove(evt: any) {
      return evt.relatedContext.component.$attrs.group.accepts.includes(
        evt.draggedContext.element.type
      );
    },
    async getWeapons() {
      const weaponsCache = window.sessionStorage.getItem("weapons");
      if (weaponsCache) {
        this.weapons = JSON.parse(weaponsCache);
        return;
      }
      const data = await fetch("https://genshin.jmp.blue/weapons/");
      const json = await data.json();
      const results = [];
      for (const weapon of json) {
        results.push(await fetch(`https://genshin.jmp.blue/weapons/${weapon}`));
      }
      const jsons = [];
      for (const result of results) {
        jsons.push(await result.json());
      }
      for (const weapon of jsons) {
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
        }))(weapon);
        this.weapons.push(weaponObj);
      }
      window.sessionStorage.setItem("weapons", JSON.stringify(this.weapons));
    },
  },
});
</script>

<template>
  <div id="chars-container">
    <draggable
      :list="chars"
      tag="div"
      :group="{ name: 'characters', put: ['tier'], accepts: ['character'] }"
      item-key="id"
      class="min-h-32 flex flex-wrap justify-center h-fit p-4 border-2 border-white rounded-lg rounded-l-none bg-slate-800"
      delay="150"
      delay-on-touch-only="true"
      :move="onMove"
      :animation="200"
    >
      <template #item="{ element }">
        <div class="hover:cursor-move flex w-20 max-w-32 max-h-32 md:w-32">
          <!-- <div>{{ element }}</div> -->
          <img
            :src="`https://genshin.jmp.blue/characters/${element.id.toLowerCase()}/icon`"
            :alt="`${element.id}-icon`"
            class="h-full w-full"
          />
          <!-- <HelloWorld :list="element.nested" class="ml-2" /> -->
        </div>
      </template>
    </draggable>
  </div>
</template>

<style lang="postcss">
#chars-container .sortable-chosen {
  @apply opacity-50 h-20 w-20 md:h-32 md:w-32 bg-opacity-0;
}
</style>

<script lang="ts" scoped>
import { defineComponent } from "vue";
import draggable from "vuedraggable";

export default defineComponent({
  name: "CharactersDraggable",
  components: {
    draggable,
  },
  data() {
    return {
      chars: [] as object[],
    };
  },
  async mounted() {
    await this.getCharacters();
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onMove(evt: any) {
      return evt.relatedContext.component.$attrs.group.accepts.includes(
        evt.draggedContext.element.type
      );
    },
    async getCharacters() {
      const charactersCache = window.sessionStorage.getItem("characters");
      if (charactersCache) {
        this.chars = JSON.parse(charactersCache);
        return;
      }
      const data = await fetch("https://genshin.jmp.blue/characters/");
      const json = await data.json();
      const results: Response[] = [];
      for (const char of json) {
        results.push(
          await fetch(`https://genshin.jmp.blue/characters/${char}`)
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const jsons: any[] = [];
      for (const result of results) {
        jsons.push(await result.json());
      }
      for (const char of jsons) {
        const character = (({
          id,
          name,
          weapon,
        }: {
          id: string;
          name: string;
          weapon: string;
        }) => ({
          id,
          name,
          weapon,
          nested: [],
          type: "character",
        }))(char);
        this.chars.push(character);
      }
      window.sessionStorage.setItem("characters", JSON.stringify(this.chars));
    },
  },
});
</script>

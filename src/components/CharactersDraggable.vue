<template>
  <draggable
    :list="chars"
    tag="div"
    :group="{ name: 'characters', put: ['tier'], accepts: ['character'] }"
    item-key="id"
    class="min-h-32 flex flex-wrap h-fit"
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
          :src="`https://genshin.jmp.blue/characters/${element.id.toLowerCase()}/icon`"
          :alt="`${element.id}-icon`"
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
    const data = await fetch("https://genshin.jmp.blue/characters/");
    const json = await data.json();
    const charPromises = [];
    for (const char of json) {
      charPromises.push(fetch(`https://genshin.jmp.blue/characters/${char}`));
    }
    const results = await Promise.allSettled(charPromises);
    const jsonPromises = [];
    for (const result of results) {
      if (result.status == "fulfilled") {
        jsonPromises.push(result.value.json());
      }
    }
    const jsonResults = await Promise.allSettled(jsonPromises);
    for (const char of jsonResults) {
      if (char.status == "rejected") return;
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
        type: "character",
      }))(char.value);
      this.chars.push(character);
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

<template>
  <draggable
    :list="chars"
    tag="div"
    :group="{ name: 'characters', put: ['tier'] }"
    item-key="id"
    class="min-h-32 max-h-32 flex flex-wrap"
    chosen-class="chosen"
    delay="150"
    delay-on-touch-only="true"
  >
    <template #item="{ element }">
      <div
        class="list-group-item hover:cursor-move flex w-32 max-w-32 max-h-32"
      >
        <!-- <div>{{ element }}</div> -->
        <img
          :src="`https://genshin.jmp.blue/characters/${element}/icon`"
          :alt="`${element}-icon`"
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
      chars: [],
    };
  },
  async mounted() {
    const data = await fetch("https://genshin.jmp.blue/characters/");
    const json = await data.json();
    this.chars = json;
  },
});
</script>

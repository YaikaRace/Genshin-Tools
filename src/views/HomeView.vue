<template>
  <article class="min-h-screen w-11/12 max-w-[70rem] mx-auto mt-10">
    <tierlist-component />
    <section>
      <tabs :tabs="tabs" @tab-selected="(v: number) => selectedTab = v">
        <tab :active="selectedTab == 0">
          <characters-draggable />
        </tab>
        <tab :active="selectedTab == 1">
          <weapons-draggable />
        </tab>
      </tabs>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CharactersDraggable from "@/components/draggables/CharactersDraggable.vue";
import WeaponsDraggable from "@/components/draggables/WeaponsDraggable.vue";
import TierlistComponent from "@/components/TierlistComponent.vue";
import tab from "@/components/TabComponent.vue";
import tabs from "@/components/TabsComponent.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    CharactersDraggable,
    WeaponsDraggable,
    TierlistComponent,
    tab,
    tabs,
  },
  data() {
    return {
      tabs: [
        {
          id: 0,
          title: "Characters",
        },
        {
          id: 1,
          title: "Weapons",
        },
      ],
      selectedTab: 0,
    };
  },
});
</script>

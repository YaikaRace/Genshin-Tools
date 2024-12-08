<template>
  <article class="w-11/12 max-w-[70rem] mx-auto mt-10 scale-[.85]">
    <tierlist-component :readonly-tiers="tierlist" />
  </article>
</template>

<script lang="ts">
import TierlistComponent from "@/components/TierlistComponent.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TierlistViewer",
  components: {
    TierlistComponent,
  },
  props: {
    isShared: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tierlist: [],
    };
  },
  async created() {
    if (this.isShared) {
      this.getSharedTier();
      return;
    }
    await this.getTierById();
  },
  methods: {
    getSharedTier() {
      if (!this.$route.params.sharedTier) {
        this.$router.replace({ name: "notFound" });
        return;
      }
      const data = atob(this.$route.params.sharedTier as string);
      this.tierlist = JSON.parse(data);
    },
    async getTierById() {
      const tierId = this.$route.params.tierId;
      if (!tierId) {
        this.$router.replace({ name: "notFound" });
        return;
      }
      const baseURL = process.env.VUE_APP_API_URL;
      if (!baseURL) {
        this.$router.replace({ name: "notFound" });
        return;
      }
      try {
        const result = await fetch(`${baseURL}/tierlist/${tierId}`, {
          credentials: "include",
          headers: {
            "x-access-key": process.env.VUE_APP_ACCESS_KEY,
          },
        });
        const json = await result.json();
        console.log(json);
        if (json.success !== undefined && !json.success) {
          this.$router.replace({ name: "notFound" });
          return;
        }
        this.tierlist = json.tiers;
      } catch {
        console.log("Error getting tierlist");
        this.$router.replace({ name: "notFound" });
      }
    },
  },
});
</script>

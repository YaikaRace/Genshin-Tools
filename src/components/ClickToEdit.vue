<template>
  <div class="min-h-32 h-full w-32 flex items-center">
    <textarea
      v-if="edit"
      class="w-32 max-w-32 text-center"
      :value="valueLocal"
      @blur="
        valueLocal = $event.target.value;
        edit = false;
        $emit('input', valueLocal);
      "
      @keyup.enter="
        valueLocal = $event.target.value;
        edit = false;
        $emit('input', valueLocal);
      "
      v-focus="edit"
    />
    <p
      v-else
      @click="edit = true"
      class="w-32 max-w-32 text-center whitespace-normal break-words"
    >
      {{ valueLocal }}
    </p>
  </div>
</template>

<script>
export default {
  name: "ClickToEdit",
  props: ["value"],
  data() {
    return {
      edit: false,
      valueLocal: this.value,
    };
  },
  watch: {
    value: function () {
      this.valueLocal = this.value;
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
};
</script>

<template>
  <div class="form-item">
    <input
      ref="input"
      :type="type"
      :name="name?.toLowerCase().replaceAll(' ', '')"
      :id="name?.toLowerCase().replaceAll(' ', '')"
      :value="modelValue"
      placeholder=" "
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      @focus="$emit('focused')"
      :class="{ 'input-error': error }"
      :required="required"
    />
    <label :for="name?.toLowerCase().replaceAll(' ', '')">{{ name }}</label>
    <strong v-if="error" class="error">{{ error }}</strong>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type InputType = "text" | "email" | "password";

export default defineComponent({
  name: "FormInput",
  props: {
    modelValue: String,
    error: String,
    name: String,
    required: Boolean,
    type: {
      type: String,
      default: "text" as InputType,
    },
  },
  emits: ["update:modelValue", "focused"],
});
</script>

<style lang="postcss" scoped>
.form-item {
  @apply relative my-4;
}
input {
  @apply w-full border-solid border-2 border-gray-500 px-2 py-1 bg-slate-900 text-white caret-white transition-colors duration-200 rounded-lg;
}
input:focus {
  @apply border-purple-600 outline-none;
}
label {
  @apply absolute left-2 top-1 text-gray-500 font-medium cursor-text transition-all duration-200;
}
input:focus + label {
  @apply text-purple-600 font-semibold;
}
input:focus + label,
input:not(:placeholder-shown) + label {
  @apply -top-3 bg-slate-800 text-xs;
}
.error {
  @apply text-red-400 mb-4 block font-bold text-xs;
}
.input-error {
  @apply !border-red-400 text-red-400;
}
.input-error + label {
  @apply !text-red-400;
}
</style>

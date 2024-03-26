<script lang="ts" setup>
defineProps<{
  modelValue: string;
  rules: Array<Function>;
}>();

defineEmits(["update:modelValue", "input"]);
</script>

<template>
  <v-text-field
    :v-model="modelValue"
    :rules="rules"
    @input="$emit('input')"
    placeholder="00000-000"
    mask="#####-###"
    return-masked-value
  />
</template>

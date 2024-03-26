<script lang="ts" setup>
defineProps<{
  buttonText: string;
  disabled: boolean;
}>();
</script>

<template>
  <v-btn :disabled="disabled" @click="$emit('click')">{{ buttonText }}</v-btn>
</template>

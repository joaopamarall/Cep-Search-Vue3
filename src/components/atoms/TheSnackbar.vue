<script lang="ts" setup>
defineProps<{
  message: string;
}>();
</script>

<template>
  <v-snackbar color="error">{{ message }}</v-snackbar>
</template>

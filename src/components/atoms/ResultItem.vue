<template>
  <v-list-item-content>
    <v-list-item-title>{{ result }}</v-list-item-title>
  </v-list-item-content>
</template>

<script lang="ts" setup>
defineProps<{
  result: {
    type: string;
    required: true;
  };
}>();
</script>

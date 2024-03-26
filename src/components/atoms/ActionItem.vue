<template>
  <v-list-item-action>
    <base-button buttonText="Excluir" :clickHandler="removeResult" />
  </v-list-item-action>
</template>

<script lang="ts" setup>
defineProps<{
  removeResult: {
    type: Function;
    required: true;
  };
}>();
</script>

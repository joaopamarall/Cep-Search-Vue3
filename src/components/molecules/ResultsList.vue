<script lang="ts" setup>
defineProps<{
  buttonText: string;
  searchResults: string[];
}>();

defineEmits(["remove", "delete"]);
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-list>
        <v-list-item v-for="(result, index) in searchResults" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ result }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <base-button buttonText="Excluir" @click="$emit('remove', index)" />
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <base-button buttonText="Limpar resultados" @click="$emit('delete')" />
    </v-col>
  </v-row>
</template>

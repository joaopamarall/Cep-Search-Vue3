<script lang="ts" setup>
import { useAppStore } from "@/stores/app";

const { cep, validCep } = useAppStore();
</script>

<template>
  <cep-imput-with-validation />
  <v-col cols="12" class="mt-3">
    <base-button
      buttonText="Buscar"
      :disabled="!validCep"
      @click="$emit('search')"
    />
    <base-button
      buttonText="Limpar"
      :disabled="cep.length === 0"
      @click="$emit('clear')"
    />
  </v-col>
  <the-snackbar />
</template>

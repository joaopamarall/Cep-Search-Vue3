<template>
  <v-row>
    <v-col cols="12">
      <text-field
        :v-model="cep"
        :rules="cepRules"
        @input="validCep"
        label="CEP"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app";

defineProps<{
  cep: string;
  validCep: boolean;
  cepRules: Array<Function>;
}>();

defineEmits(["search", "clear"]);
</script>

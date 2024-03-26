<script lang="ts" setup>
import axios from "axios";
import { ref, watch } from "vue";
const cep = ref("");
const validCep = ref(false);
const snackbar = ref(false);
const dialogDelete = ref(false);
const searchResults = ref<string[]>([]);

watch(dialogDelete, (params) => {
  return params || closeDelete;
});

const closeDelete = () => {
  dialogDelete.value = false;
};

const cepRules = [
  (value: string) => !!value || "CEP é obrigatório",
  (value: string) => (value && value.length === 9) || "CEP inválido",
];

const validateCep = () => {
  validCep.value = cep.value.match(/^\d{5}-\d{3}$/) !== null;
};

const searchCep = async () => {
  try {
    const response = await axios.get(
      `https://viacep.com.br/ws/${cep.value}/json/`
    );
    const data = response.data;
    if (data.erro) {
      snackbar.value = true;
    } else {
      searchResults.value.push(
        `${data.logradouro}, ${data.localidade} - ${data.uf}`
      );
    }
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
  }
};

const deleteItem = () => {
  dialogDelete.value = true;
};

const clearInput = () => {
  cep.value = "";
  validCep.value = false;
};

const removeResult = (index: number) => {
  searchResults.value.splice(index, 1);
};

const deleteItemConfirm = () => {
  searchResults.value = [];
  dialogDelete.value = false;
};
</script>

<template>
  <v-container class="d-flex flex-column align-center">
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="cep"
          label="CEP"
          :rules="cepRules"
          @input="validateCep"
        />
      </v-col>
      <v-col cols="12" class="mt-3">
        <v-btn @click="searchCep" :disabled="!validCep">Buscar</v-btn>
        <v-btn @click="clearInput" :disabled="cep.length === 0">Limpar</v-btn>
      </v-col>
    </v-row>

    <v-row v-if="searchResults.length > 0" class="mt-5">
      <v-col cols="12">
        <v-list>
          <v-list-item v-for="(result, index) in searchResults" :key="index">
            <v-list-item-content>
              <v-list-item-title>{{ result }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn @click="removeResult(index)">Excluir</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-btn @click="deleteItem()" class="mt-3">Limpar resultados</v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >Você quer mesmo limpar a lista de CEP?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
            >Cancel</v-btn
          >
          <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" color="error">CEP não encontrado</v-snackbar>
  </v-container>
</template>

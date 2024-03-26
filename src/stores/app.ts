// Utilities
import { defineStore } from "pinia";
import axios from "axios";

export const useAppStore = defineStore("app", {
  state: () => ({
    cep: "",
    validCep: false,
    snackbar: false,
    dialogDelete: false,
    searchResults: [],
  }),
  actions: {
    validateCep() {
      this.validCep = this.cep.match(/^\d{5}-\d{3}$/) !== null;
    },
    async searchCep() {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${this.cep}/json/`
        );
        const data = response.data;
        if (data.erro) {
          this.snackbar = true;
        } else {
          this.searchResults.push(
            `${data.logradouro}, ${data.localidade} - ${data.uf}`
          );
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    },
    removeResult(index: number) {
      this.searchResults.value.splice(index, 1);
    },
    deleteItems() {
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.searchResults = [];
      this.dialogDelete = false;
    },
    clearInput() {
      this.cep = "";
      this.validCep = false;
    },
  },
});

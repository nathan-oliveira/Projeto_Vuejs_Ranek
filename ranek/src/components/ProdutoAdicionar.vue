<template>
  <form class="adicionar-produto">
    <label for="nome">Nome</label>
    <input type="text" id="nome" name="nome" v-model="produto.nome" />

    <label for="preco">Preço (R$)</label>
    <input type="number" id="preco" name="preco" v-model="produto.preco" />

    <label for="fotos">Fotos</label>
    <input type="file" id="fotos" name="fotos" multiple ref="fotos" />

    <label for="descricao">Descrição</label>
    <textarea
      id="descricao"
      name="descricao"
      v-model="produto.descricao"
    ></textarea>

    <button class="btn" @click.prevent="adicionarProduto">
      Adicionar produto
    </button>
  </form>
</template>

<script>
import { api } from "@/services";

export default {
  name: "ProdutoAdicionar",
  data() {
    return {
      produto: {
        nome: "",
        preco: "",
        vendido: "false",
        descricao: "",
        fotos: null,
      },
    };
  },
  methods: {
    formatarProduto() {
      const form = new FormData();

      const files = this.$refs.fotos.files;
      for (let i = 0; i < files.lenght; i++) {
        form.append(files[i].name, files[i]);
      }

      form.append("nome", this.produto.nome);
      form.append("preco", this.produto.preco);
      form.append("vendido", this.produto.vendido);
      form.append("descricao", this.produto.descricao);
      form.append("usuario_id", this.$store.state.usuario.id);

      return form;
    },
    async adicionarProduto(event) {
      const produto = this.formatarProduto();

      const button = event.currentTarget;
      button.value = "Adicionando...";
      button.setAttribute("disabled", "");

      await api.post("/produto", produto);
      await this.$store.dispatch("getUsuarioProdutos");

      button.value = "Adicionar produto";
      button.removeAttribute("disabled", "");
    },
  },
};
</script>

<style scoped>
.adicionar-produto {
  display: grid;
  grid-auto-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 70px;
}

.btn {
  grid-column: 2;
}
</style>
<template>
  <div>
    <b-form class="mt-2">
      <b-row>
        <b-col class="col-6 offset-sm-3">
          <b-form-group label="Tarefa:" label-for="subject">
            <b-form-input id="subject" v-model="form.subject" type="text" required></b-form-input>
          </b-form-group>
        </b-col>

        <b-col class="col-6 offset-sm-3">
          <b-form-group label="Descrição:" label-for="description">
            <b-form-textarea id="description" v-model="form.description" type="text" required></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>

      <b-col class="col-6 offset-sm-3">
        <b-button type="button" variant="info" @click="saveTask">Salvar</b-button>
        <b-button type="reset" variant="warning" class="mx-2">Limpar</b-button>
      </b-col>
    </b-form>
  </div>
</template>

<script>
import { db } from '../firebaseDb';
import Vue from 'vue';

export default {
  name: "FormTasksView",
  data() {
    return {
      form: {
        subject: "",
        description: ""
      }
    }
  },
  methods: {
    saveTask() {
      db.collection('tasks').add(this.form).then( () => {
        this.clearForm();
        this.makeToast();
        this.$router.push({ name: 'list' });
      });
    },
    clearForm() {
      this.form.subject = "";
      this.form.description = "";
    },
    makeToast() {
      const vm = new Vue();
      vm.$bvToast.toast(`Tarefa salva com sucesso`, {
        title: 'Sucesso',
        autoHideDelay: 5000,
        variant: 'success'
      })
    }
  }
}
</script>
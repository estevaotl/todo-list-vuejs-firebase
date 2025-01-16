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
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import Vue from 'vue';

export default {
  name: "FormTasksView",
  data() {
    return {
      form: {
        id: "",
        subject: "",
        description: ""
      }
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    if (this.form.id) {
      this.fetchTask();
    }
  },
  methods: {
    async saveTask() {
      try {
        if (this.form.id) {
          await this.updateTask();
        } else {
          await this.insertTask();
        }

        this.clearForm();
        this.$router.push({ name: 'list' });
      } catch (error) {
        console.error("Erro ao salvar tarefa:", error);
        this.makeToast("Erro ao salvar tarefa", 'danger');
      }
    },
    async insertTask() {
      try {
        const tasksCollection = collection(db, "tasks");
        await addDoc(tasksCollection, {
          subject: this.form.subject,
          description: this.form.description
        });
        this.makeToast("Tarefa salva com sucesso", 'success');
      } catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
        this.makeToast("Erro ao adicionar tarefa", 'danger');
      }
    },

    async updateTask() {
      try {
        // Função para atualizar uma tarefa existente
        const taskDocRef = doc(db, "tasks", this.form.id);
        await updateDoc(taskDocRef, {
          subject: this.form.subject,
          description: this.form.description
        });
        this.makeToast("Tarefa atualizada com sucesso", 'success');
      } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
        this.makeToast("Erro ao atualizar tarefa", 'danger');
      }
    },

    clearForm() {
      this.form.subject = "";
      this.form.description = "";
    },

    makeToast(message, variant) {
      const vm = new Vue();
      vm.$bvToast.toast(message, {
        title: variant === 'success' ? 'Sucesso' : 'Erro',
        autoHideDelay: 5000,
        variant: variant
      });
    },
    async fetchTask() {
      try {
        const taskDocRef = doc(db, "tasks", this.form.id);
        const taskSnapshot = await getDoc(taskDocRef);

        if (taskSnapshot.exists()) {
          const task = taskSnapshot.data();
          this.form.subject = task.subject;
          this.form.description = task.description;
        } else {
          console.log("Tarefa não encontrada");
        }
      } catch (error) {
        console.error("Erro ao obter tarefa:", error);
      }
    }
  }
};
</script>
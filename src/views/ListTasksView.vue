<template>
  <div>
    <div class="d-flex justify-content-center" v-for="task in tasks" :key="task.id">
      <div class="col-6 mt-2">
        <b-card :title="task.subject">
          <b-card-text>
            {{ task.description }}
          </b-card-text>

          <b-button variant="info" class="mr-2" @click="updateTask(task.id)">Editar</b-button>
          <b-button variant="danger" class="mx-2" @click="deleteTask(task)">Excluir</b-button>
        </b-card>
      </div>
    </div>

    <b-modal ref="modalRemove" hide-footer title="Exclusão de tarefa">
      <div class="d-block text-center">
        Deseja realmente excluir a tarefa: {{ taskSelected.subject }}?
      </div>

      <div class="mt-3 d-flex justify-content-end">
        <b-button variant="light" @click="hideModal">Cancelar</b-button>
        <b-button class="mx-2" variant="danger" @click="confirmRemoveTask">Excluir</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { db } from '../firebaseDb';
import { doc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import Vue from 'vue';

export default {
  name: "ListTasksView",
  data() {
    return {
      tasks: [],
      taskSelected: ''
    };
  },
  created() {
    this.getTasks();
  },
  methods: {
    async getTasks() {
      this.tasks = [];
      try {
        const tasksCollection = collection(db, 'tasks');
        const snapshot = await getDocs(tasksCollection);
        snapshot.forEach(doc => {
          let objectTask = doc.data();

          objectTask.id = doc.id;

          this.tasks.push(objectTask);
        });
      } catch (error) {
        console.error("Erro ao obter tarefas:", error);
      }
    },
    async updateTask(idTask) {
      this.$router.push({name: "form", params: { id: idTask }})
    },
    async deleteTask(task) {
      this.taskSelected = task;
      this.$refs.modalRemove.show();
    },
    async hideModal() {
      this.$refs.modalRemove.hide();
    },
    async confirmRemoveTask() {
      try {
        const taskDocRef = doc(db, "tasks", this.taskSelected.id);

        await deleteDoc(taskDocRef);

        this.taskSelected = "";
        this.hideModal();

        this.getTasks();

        this.makeToast("Tarefa removida com sucesso", 'success');
      } catch (error) {
        console.error("Erro ao remover tarefa:", error);
        this.makeToast("Erro ao remover tarefa", 'danger');
      }
    },
    makeToast(message, variant) {
      const vm = new Vue();
      vm.$bvToast.toast(message, {
        title: variant === 'success' ? 'Sucesso' : 'Erro',
        autoHideDelay: 5000,
        variant: variant
      });
    }
  }
};
</script>
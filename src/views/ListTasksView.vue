<template>
  <div>
    <div class="d-flex justify-content-center" v-for="task in tasks" :key="task.id">
      <div class="col-6 mt-2">
        <b-card :title="task.subject">
          <b-card-text>
            {{ task.description }}
          </b-card-text>

          <b-button variant="info" class="mr-2" @click="updateTask(task.id)">Editar</b-button>
          <b-button variant="danger" class="mx-2">Excluir</b-button>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebaseDb'; // Importando o db configurado com Firebase v9+
import { collection, getDocs } from 'firebase/firestore'; // Importando as funções para ler os dados

export default {
  name: "ListTasksView",
  data() {
    return {
      tasks: []
    };
  },
  created() {
    this.getTasks();
  },
  methods: {
    async getTasks() {
      this.tasks = [];
      try {
        // Acessando a coleção 'tasks'
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
    }
  }
};
</script>
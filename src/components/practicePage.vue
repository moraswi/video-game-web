<template>
  <div>
    <v-container>
      <v-card class="pa-10 text-left">
        <v-text-field
          v-model="customerId"
          label="Outlined"
          placeholder="enter employee ID"
          color="primary"
          outlined
          filled
          dense
        ></v-text-field>
        <v-btn @click="getEmployeeById()" depressed color="primary">
          employee by id
        </v-btn>

        <p>{{ employeesById.id }} {{ employeesById.title }}</p>
        <p>{{ employeesById.body }}</p>
      </v-card>
    </v-container>
    <v-container class="">
      <v-card
        class="transparent text-left"
        v-for="employee in employees"
        :key="employee.id"
        align="center"
        flat
        tile
      >
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <!-- <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Click Me
        </v-btn> -->

            <v-card
              class="grey mt-5 pa-3"
              width="700px"
              v-bind="attrs"
              v-on="on"
            >
              <p>{{ employee.id }} {{ employee.title }}</p>
            </v-card>
          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Body of a clicked card
            </v-card-title>

            <v-card-text>
              {{ employee.body }}
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "VidioGamePractice",

  data() {
    return {
      employees: [],
      employeesById: [],
      customerId: 0,
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          console.log(response), (this.employees = response.data);
        });
    },

    getEmployeeById() {
      axios
        .get("https://jsonplaceholder.typicode.com/posts/" + this.customerId)
        .then((response) => (this.employeesById = response.data));
    },
  },
};
</script>

<style lang="scss" scoped>
//
</style>

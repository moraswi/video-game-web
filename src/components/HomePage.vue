<template>
  <div class="text-left">
    <v-container>
      <v-row class="mt-16">
        <v-col cols="12" md="3">
          <router-link
            class="nav-link text-decoration-none mt-1"
            :to="{ name: 'home' }"
          >
            <h2 class="heading">VIDEO GAMED</h2>
          </router-link>
        </v-col>

        <v-col cols="12" md="3">
          <router-link
            class="nav-link text-decoration-none mt-1"
            :to="{ name: 'Contacts' }"
          >
            <h2 class="heading">CONTACT</h2>
          </router-link>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row class="mt-3">
        <!-- filter card -->
        <v-col cols="12" md="3">
          <v-card class="cardPanel text-left pa-2" width="100%">
            <h4 class="textContent mb-5">Filter Results</h4>

            <p class="textContent" for="name">Name</p>
            <div class="mt-n4">
              <input v-model="message" class="textField" />
            </div>

            <p class="textContent mt-12" for="name">Minimum Score</p>
            <div class="mt-n4">
              <input v-model="minimumScore" class="textField" />
            </div>

            <p class="textContent mt-10" for="name">Order By</p>
            <div class="" align="right">
              <v-btn class="white--text py-0" color="#5692e8" dense>
                clear
              </v-btn>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="9">
          <v-container class="mt-4" v-for="post in posts" :key="post.id">
            <v-row class="cardPanel">
              <v-col class="py-0 px-0" cols="12" sm="2">
                <v-card
                  class="cardVideo py-6"
                  width="100%"
                  height="100%"
                  flat
                  tile
                  align="right"
                >
                  <div class="my-auto mx-2 hidden-md-and-up">
                    <v-avatar color="#5692e8" class="button" size="36">
                      <span class="white--text text-h5">2</span>
                    </v-avatar>
                  </div></v-card
                >
              </v-col>
              <v-col class="py-0 px-0 d-flex" cols="12" sm="10">
                <v-card class="cardPanel text-left pa-2" width="100%" flat tile>
                  <h3 class="textContent">{{ post.name }}</h3>
                  <p class="textContent">
                    Release Date: {{ post.first_release_date }}
                  </p>
                  <p class="textContent">
                    {{ post.summary }}
                  </p>
                </v-card>
                <div class="my-auto mx-2 hidden-sm-and-down">
                  <v-avatar color="#5692e8" class="button" size="50">
                    <span class="white--text text-h5">
                      {{ post.rating }}
                    </span>
                  </v-avatar>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>

    <v-overlay :value="overlay" z-index="1000">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",

  data: () => ({
    posts: [],
    overlay: false,
  }),

  created() {
    this.getVedioData();
  },
  methods: {
    //calling vedio data Api

    getVedioData() {
      this.overlay = true;
      axios
        .get("https://public.connectnow.org.uk/applicant-test/")
        .then((response) => {
          this.posts = response.data;
          console.log("data", response.data);
          this.overlay = false;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="scss" scoped>
//
// .heading {
//   color: #ffffff;
// }

.textField {
  border-style: none;
  stroke: none;
  outline-style: none;
  background-color: #182c47;
}
</style>

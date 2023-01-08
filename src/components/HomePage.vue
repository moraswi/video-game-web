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
          <v-card class="cardPanel text-left mt-4 pa-2" width="100%">
            <h4 class="textContent mb-5">Filter Results</h4>

            <p class="textContent" for="name">Name</p>
            <div class="mt-n4">
              <input v-model="searchByName" class="textField" />
            </div>

            <p class="textContent mt-12" for="name">Minimum Score</p>
            <div class="mt-n4">
              <input v-model="searchByScore" class="textField" />
            </div>

            <p class="textContent mt-10" for="name">Order By</p>

            <select v-model="selectOpton" class="textField">
              <option model="score" value="score">Score</option>
              <option model="name" value="name">Name</option>
            </select>
            <div class="mt-3" align="right">
              <v-btn
                class="white--text py-0"
                color="#5692e8"
                @click="clearData"
              >
                clear
              </v-btn>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="9">
          <v-container
            class="my-4"
            v-for="post in filterdBlogs"
            :key="post.id"
            :per-page="5"
          >
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
                  <!-- hidden-md-and-up -->
                  <div class="my-auto mx-2">
                    <v-avatar
                      color="#5692e8"
                      class="button"
                      size="36"
                      v-show="$vuetify.breakpoint.xs"
                    >
                      <span class="white--text text-h5">2</span>
                    </v-avatar>

                    <!-- <v-avatar
                      color="#5692e8"
                      class="button"
                      size="36"
                      v-show="$vuetify.breakpoint.lg"
                    >
                      <span class="white--text text-h5">2</span>
                    </v-avatar> -->
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
                <!--  -->
                <div class="my-auto mx-2">
                  <v-avatar
                    color="#5692e8"
                    class="button hidden-sm-and-down"
                    size="50"
                  >
                    <span class="white--text text-h5">
                      {{ post.rating }}
                    </span>
                  </v-avatar>

                  <v-avatar
                    color="#5692e8"
                    class="button"
                    size="50"
                    v-show="$vuetify.breakpoint.sm"
                  >
                    <span class="white--text text-h5">
                      {{ post.rating }}
                    </span>
                  </v-avatar>
                </div>
              </v-col>
            </v-row>
          </v-container>

          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="perPage"></v-pagination>
          </div>
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

  // el: "#pagination-app",

  data: () => ({
    searchByName: "",
    searchByScore: "",
    selectOpton: "",
    posts: [],
    overlay: false,

    page: 1,
    perPage: 5,
    pages: [],
  }),

  created() {
    this.getVedioData();
    // this.getVedioData();
  },

  watch: {
    posts() {
      this.setPages();
    },
  },

  computed: {
    //search by name
    filterdBlogs: function () {
      return this.posts.filter((post) => {
        return post.name.toLowerCase().match(this.searchByName);
      });
    },

    // sort by score
    /* eslint-disable */
    sortByScore() {
      return this.posts.sort((a, b) => {
        return a.rating - b.rating;
      });
    },

    // sort by Name
    sortByName: function () {
      function compare(a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }

      return this.posts.sort(compare);
    },

    //separating data into pages
    displayedPosts() {
      return this.paginate(this.posts);
    },
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

    clearData() {
      this.searchByName = "";
      this.searchByScore = "";
      this.selectOpton = "";
    },

    setPages() {
      let numberOfPages = Math.ceil(this.posts.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },

    paginate(posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return posts.slice(from, to);
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
  color: #c1d1e8;

  width: 100%;
  height: 40px;
  padding: 10px;
}
</style>

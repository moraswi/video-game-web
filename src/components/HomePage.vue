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
              <option model="releaseDate" value="score">releaseDate</option>
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
          <v-container class="my-4" v-for="post in postsDisplay" :key="post.id">
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
                    Release Date:
                    {{ moment(post.first_release_date).format("DD/MM/YYYY") }}
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
                      {{ post.rating.toFixed(0) }}
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
    releaseDate: "",
    searchByScore: "",
    selectOpton: "",
    posts: [],
    postsDisplay: [],
    overlay: false,
  }),

  created() {
    this.getVedioData();
    // this.getVedioData();
  },

  watch: {
    selectOpton() {
      this.sort();
    },

    searchByName() {
      this.filterdBlogsName();

      this.sort();
    },

    searchByScore() {
      this.filterByScore();
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
          this.postsDisplay = response.data;
          console.log("data", response.data);
          this.overlay = false;
        })
        .catch((error) => console.log(error));
    },

    clearData() {
      this.searchByName = "";
      this.searchByScore = "";
      this.releaseDate = "";
      this.selectOpton = "";
    },

    filterdBlogsName() {
      this.postsDisplay = this.posts.filter((post) => {
        return post.name.toLowerCase().match(this.searchByName);
      });
    },

    sort() {
      if (this.selectOpton == "name") {
        this.sortByName();
      } else if (this.selectOpton == "score") {
        this.sortByScore();
      } else if (this.selectOpton == "releaseDate") {
        this.sortByDate();
      }
    },

    sortByScore() {
      this.postsDisplay = this.postsDisplay.sort(
        (curentFirstScore, currentSecondScore) => {
          return curentFirstScore.rating - currentSecondScore.rating;
        }
      );
    },

    sortByDate() {
      this.postsDisplay = this.postsDisplay.sort(
        (curentFirstScore, currentSecondScore) => {
          return (
            curentFirstScore.first_release_date -
            currentSecondScore.first_release_date
          );
        }
      );
    },

    // sort by Name(dropdown)
    sortByName() {
      function compare(curentFirstName, currentSecondName) {
        if (curentFirstName.name < currentSecondName.name) return -1;
        if (curentFirstName.name > currentSecondName.name) return 1;
        return 0;
      }

      this.postsDisplay = this.postsDisplay.sort(compare);
    },

    filterByScore() {
      let arrayValues = this.searchByScore.split("-");

      if (arrayValues.length == 2) {
        let min = arrayValues[0].trim();
        let max = arrayValues[1].trim();

        if (this.isInteger(min) && this.isInteger(max)) {
          let tempPosts = [];

          this.posts.forEach((post) => {
            let rating = parseInt(post.rating);

            if (parseInt(min) <= rating && rating <= parseInt(max)) {
              tempPosts.push(post);
            }
          });

          this.postsDisplay = tempPosts;

          this.sort();
        }
      }
    },

    isInteger(value) {
      return /^\d+$/.test(value);
    },
  },
};
</script>

<style lang="scss" scoped>
//

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

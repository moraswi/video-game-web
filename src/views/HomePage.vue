<template>
  <!-- <div class="home">
    <HomePage />
  </div> -->

  <v-app>
    <v-main class="">
      <HomePage />
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src
import HomePage from "@/components/HomePage.vue";

export default {
  name: "HomeView",
  components: {
    HomePage,
  },
};
</script>
<style lang="scss" scoped></style>

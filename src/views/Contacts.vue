<template>
  <v-app>
    <v-main class="">
      <Contacts />
    </v-main>
  </v-app>
</template>

<script>
import Contacts from "@/components/Contacts.vue";

export default {
  name: "HomeView",
  components: {
    Contacts,
  },
};
</script>
<style lang="scss" scoped></style>

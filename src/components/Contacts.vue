<template>
  <div class="">
    <v-container class="text-left">
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
      <v-card class="mt-10 transparent" align="center" flat tile>
        <v-card class="text-left transparent" width="600" flat>
          <div>
            <h2 class="textContent">GET IN TOUCH</h2>
            <p class="mt-2 textContent">
              Trysail transma durt sea Legs Trysail transma durt sea Legs
              Trysail transma durt sea Legs Trysail transma durt sea Legs
              Trysail transma durt sea Legs Trysail transma durt Legs Trysail
              transma durt
            </p>
          </div>

          <v-card class="cardPanel pa-3 mt-10" width="600" flat>
            <h4 class="textContent">Contact Form</h4>

            <v-row class="mt-4">
              <v-col cols="12" md="6">
                <p class="textContent" for="name">Name</p>
                <div class="mt-n4">
                  <input v-model="name" class="textField" />
                </div>
              </v-col>

              <v-col cols="12" md="6">
                <p class="textContent" for="name">Email Address</p>
                <div class="mt-n4">
                  <input v-model="emailAddress" class="textField" />
                </div>
              </v-col>

              <v-col cols="12" md="12">
                <p class="textContent" for="name">Message</p>
                <div class="mt-n4">
                  <textarea class="textField" v-model="message"></textarea>
                </div>
              </v-col>
            </v-row>

            <div class="" align="right">
              <v-btn class="white--text py-0" color="#5692e8" dense>
                send
              </v-btn>
            </div>
          </v-card>
        </v-card>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ContactPage",

  data: () => ({}),
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

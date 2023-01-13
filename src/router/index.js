import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/views/HomePage.vue";
import contacts from "@/views/Contacts.vue";
import practicePage from "@/views/Practice.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },

  {
    path: "/contacts",
    name: "contacts",
    component: contacts,
  },

  {
    path: "/practice",
    name: "practicePage",
    component: practicePage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

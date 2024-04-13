import { createApp } from "vue";
import App from "./App.vue";

import { createStore } from "vuex";

import "./assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

// List of available users
const users = [
  {
    fullName: "Sara Norman",
    firstName: "Sara",
    lastName: "Norman",
    id: "5344-9709",
    doctor: "Dr. Jason Rosenberg",
    doctorPhone: "579-0432",
    lowGlucose: 80,
    highGlucose: 140,
  },
  {
    fullName: "Gregg Norman",
    firstName: "Gregg",
    lastName: "Norman",
    id: "1275-4307",
    doctor: "Dr. Nikhil Singh",
    doctorPhone: "334-2309",
    lowGlucose: 70,
    highGlucose: 120,
  },
];

// Create a store to determine which user is selected if any
const store = createStore({
  state: {
    selectedUser: null,
    users,
  },
  mutations: {
    selectUser(state, user) {
      state.selectedUser = user;
    },
  },
  actions: {
    selectUser(context, user) {
      context.commit("selectUser", user);
    },
    logout(context) {
      context.commit("selectUser", null);
    },
  },
});

const app = createApp(App);
app.use(store);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");

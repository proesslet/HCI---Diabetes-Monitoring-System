<script>
import GlucoseRecording from "./components/GlucoseRecording.vue";

export default {
  components: {
    GlucoseRecording,
  },
  computed: {
    user() {
      return this.$store.state.selectedUser;
    },
    users() {
      return this.$store.state.users;
    },
  },
  methods: {
    logout() {
      this.$store.commit("selectUser", null);
    },
    selectUser(user) {
      this.$store.commit("selectUser", user);
    },
  },
};
</script>

<template>
  <!-- Header that says "Diabetes Monitoring" in the top left corner, and if a user is selected, show "Logout" button in the top right-->
  <header>
    <h1>Diabetes Monitoring</h1>
    <div id="logoutContainer">
      <div id="patientName">
        <p v-if="user">{{ user.firstName }} {{ user.lastName }}</p>
        <p v-if="user">{{ user.id }}</p>
      </div>
      <button v-if="user" @click="logout" id="logoutBtn">Logout</button>
    </div>
  </header>

  <!-- If no user is selected, display a list of buttons to select a user-->
  <div v-if="!user" id="userSelection">
    <h2>Please Select Your Name Below</h2>
    <button v-for="user in users" :key="user.id" @click="selectUser(user)">
      {{ user.firstName }}
    </button>
  </div>

  <!-- If a user is selected, display the GlucoseRecording component-->
  <div v-if="user">
    <GlucoseRecording />
  </div>
</template>

<style scoped>
header {
  background-color: rgb(0, 117, 163);
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 1rem;
  color: white;
}

#logoutContainer {
  display: flex;
  align-items: center;
}

#patientName {
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 0;
}

#logoutBtn {
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(0, 142, 198);
  border-radius: 0.5rem;
  color: rgb(0, 142, 198);
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  width: 6rem;
}

#userSelection {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

button {
  background-color: rgb(0, 142, 198);
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  width: 10rem;
}
</style>

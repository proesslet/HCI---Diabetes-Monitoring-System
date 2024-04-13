<template>
  <div class="container">
    <!-- Stage 0: Ask if the user has recorded their reading today -->
    <div class="container" id="stage0" v-if="recordingStage == 0">
      <h1>Have you recorded your blood sugar reading today?</h1>
      <button @click="recordingStage = 1">Yes</button>
      <button @click="recordingStage = 2">No</button>
    </div>

    <!-- Stage 1 & 2: Ask the user to enter their reading (more urgently if they haven't entered it today) -->
    <div class="container" id="stage1" v-if="recordingStage == 1">
      <h1>Please Enter Your Glucose Reading</h1>

      <Tooltip text="Your glucose reading should be between 0 and 99">
        <input
          type="number"
          v-model="glucose"
          min="0"
          max="99"
          placeholder="Enter glucose reading"
        />
      </Tooltip>

      <p v-if="error" id="error">{{ error }}</p>
      <button @click="verifyGlucose">Next</button>
    </div>

    <div class="container" id="stage2" v-if="recordingStage == 2">
      <h1>Please Enter Your Glucose Reading Immediately</h1>
      <Tooltip text="Your glucose reading should be between 0 and 99">
        <input
          type="number"
          v-model="glucose"
          min="0"
          max="99"
          placeholder="Enter glucose reading"
        />
      </Tooltip>
      <p v-if="error" id="error">{{ error }}</p>
      <button @click="verifyGlucose">Next</button>
    </div>
  </div>

  <!-- Stage 3: Show a certain message based on glucose reading -->
  <div class="container" id="stage3" v-if="recordingStage == 3">
    <!-- If glucose is low, notify and remind them to eat, take medicine, etc -->
    <div class="container" v-if="glucoseLevel == 'low'">
      <h1>Your blood sugar is low.</h1>
      <p>
        Remember to eat a snack that is high in sugar and take any medicine that
        has been prescribed to you.
      </p>
      <button @click="recordingStage = 5">Next</button>
    </div>

    <!-- If glucose is high, notify and ask them to call their doctor immediately, provide doctor's name and phone. Then ask if there are ketones in their urine -->
    <div class="container" v-if="glucoseLevel == 'high'">
      <h1>Your blood sugar is high.</h1>
      <p>Pease call your doctor IMMEDIATELY:</p>
      <p>{{ this.$store.state.selectedUser.doctor }}</p>
      <p>{{ this.$store.state.selectedUser.doctorPhone }}</p>

      <button @click="recordingStage = 4">Next</button>
    </div>

    <!-- If glucose is normal, inform them it is normal -->
    <div class="container" v-if="glucoseLevel == 'normal'">
      <h1>Your blood sugar is in your normal range.</h1>
      <p>Thank you for continuing to monitor your health!</p>
      <button @click="logout">Logout</button>
    </div>
  </div>

  <!-- Stage 4: If glucose is high, ask if they have ketones in their urine -->
  <div class="container" id="stage4" v-if="recordingStage == 4">
    <h1>Do you have ketones in your urine?</h1>
    <button @click="recordingStage = 5">Yes</button>
    <button @click="recordingStage = 5">No</button>
  </div>

  <!-- Stage 5: Ask why they think their glucose reading isn't normal if their is an abnormal reading -->
  <div class="container" id="stage5" v-if="recordingStage == 5">
    <div class="flexRow">
      <h1>Why do you think your glucose reading isn't normal?</h1>
      <font-awesome-icon
        :icon="['fas', 'fa-circle-info']"
        size="lg"
        style="color: rgb(0, 142, 198)"
        @click="showNotesModal"
      />
    </div>
    <input
      id="noteInput"
      type="textarea"
      v-model="notes"
      placeholder="Enter notes here"
      required
    />
    <p v-if="error" id="error">{{ error }}</p>
    <button @click="saveNotes">Next</button>
  </div>

  <!-- Stage 6: Thank the user for recording their glucose reading -->
  <div class="container" id="stage6" v-if="recordingStage == 6">
    <h1>Thank you for recording your glucose reading!</h1>
    <button @click="logout">Logout</button>
  </div>

  <NotesModal v-show="isModalVisible" @close="closeNotesModal" />
</template>

<script>
import NotesModal from "./NotesModal.vue";
import Tooltip from "./Tooltip.vue";

export default {
  name: "GlucoseRecording",
  components: {
    NotesModal,
    Tooltip,
  },
  data() {
    return {
      glucose: "",
      notes: "",
      glucoseReadings: [],
      error: "",
      recordingStage: 0,
      isModalVisible: false,
    };
  },
  computed: {
    glucoseLevel() {
      const userLow = this.$store.state.selectedUser.lowGlucose;
      const userHigh = this.$store.state.selectedUser.highGlucose;

      if (this.glucose < userLow) {
        return "low";
      } else if (this.glucose > userHigh) {
        return "high";
      } else {
        return "normal";
      }
    },
  },
  methods: {
    verifyGlucose() {
      if (this.glucose < 0 || this.glucose > 999) {
        this.error = "Please enter a valid glucose reading between 0 and 99";
      } else {
        this.recordingStage = 3;
      }
    },
    saveNotes() {
      if (this.notes.length > 0) {
        this.recordingStage = 6;
      } else {
        this.error =
          "Please enter a note explaining why your glucose reading isn't normal";
      }
    },
    logout() {
      this.$store.commit("selectUser", null);
    },
    showNotesModal() {
      this.isModalVisible = true;
    },
    closeNotesModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style scoped>
.container {
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

input {
  width: 10rem;
}

#error {
  color: red;
}

.flexRow {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.flexRow h1 {
  margin-right: 1rem;
}

#noteInput {
  height: 5rem;
  margin-top: 1rem;
  width: 20rem;
}
</style>

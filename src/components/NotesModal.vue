<template>
  <div class="modal-backdrop">
    <div class="modal">
      <section class="modal-body">
        <slot name="body">
          <p>
            Please enter possible reasons as to why you might think your reading
            is abnormal. This could be things such as:
          </p>
          <ul>
            <li>Drinking soda</li>
            <li>Ate a lot recently</li>
            <li>Haven't eaten enough</li>
            <li>Sick</li>
          </ul>
        </slot>
      </section>

      <footer class="modal-footer">
        <button type="button" class="btn-green" @click="close">Close</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotesModal",
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #000000;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: rgb(0, 142, 198);
  background: transparent;
}

.btn-green {
  color: white;
  background: rgb(0, 142, 198);
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
</style>

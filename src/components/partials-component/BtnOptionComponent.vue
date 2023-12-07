<template>
  <div class="d-flex gap-4 ">
        <input type="radio" class="btn-check" name="options-outlined" :id="inputId" autocomplete="off" />
        <label :for="inputId" class="btn btn-outline-info btn-lg">{{ Option1 }}</label>
        <input type="radio" class="btn-check" name="options-outlined" :id="inputOtherId" autocomplete="off" />
        <label :for="inputOtherId" class="btn btn-outline-info btn-lg">{{ Option2 }}</label>
  </div>
</template>

<script>
export default {
  props: {
    Option1: {
      type: String,
      default: 'Ya'
    },
    Option2: {
      type: String,
      default: 'Tidak'
    },
    uniqueId: {
        type: String,
        required: true
    }
  },
  computed: {
    inputId() {
        return `option_${this.uniqueId}`;
    },
    inputOtherId(){
        return `optionOther_${this.uniqueId}`;
    }
  }
}
</script>

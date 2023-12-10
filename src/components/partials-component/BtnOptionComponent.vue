<template>
  <div class="d-flex gap-4">
    <input
      type="radio"
      class="btn-check"
      :name="inputId"
      :id="inputId"
      autocomplete="off"
      :value="Option1"
      v-model="selectedValue"
    />
    <label :for="inputId" class="btn btn-outline-info btn-lg">{{ Option1 }}</label>
    <input
      type="radio"
      class="btn-check"
      :name="inputId"
      :id="inputOtherId"
      autocomplete="off"
      :value="Option2"
      v-model="selectedValue"
    />
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
    },
    value: {
      type: String
    }
  },

  data() {
    return {
      selectedValue: this.value || null
    }
  },
  methods: {
    getValue(value) {
      const optionValues = {
        Ya: 'true',
        Tidak: 'false',
        'Laki-Laki': 'L',
        Perempuan: 'P'
      }

      return optionValues[value] || null
    }
  },

  computed: {
    inputId() {
      return `option_${this.uniqueId}`
    },
    inputOtherId() {
      return `optionOther_${this.uniqueId}`
    }
  },
  watch: {
    selectedValue(newValue) {
      this.$emit('update:value', this.getValue(newValue))
    }
  }
}
</script>

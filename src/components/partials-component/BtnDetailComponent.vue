<template>
  <button type="submit" :class="'btn btn-sm btn-icon-split me-2 rounded ' + Color">
    <span class="icon text-white-50">
      <i :class="'fas ' + Icon"></i>
    </span>
    <span class="text">
      {{ Message }}
    </span>
  </button>
</template>

<script>
export default {
  props: {
    Message: {
      type: String,
      default: 'Submit'
    },
    Color: {
      type: String,
      default: 'btn-warning'
    },
    Icon: {
      type: String,
      default: 'fa-eye'
    },
    data: {
      type: Object, // Adjust the type according to your data structure
      required: true
    }
  }
}
</script>

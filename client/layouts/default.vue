<template>
  <div class="p-0 w-full">
    <nuxt keep-alive />
  </div>
</template>

<script>
export default {
  name: 'Default',
  methods: {
    triggerLoginForm() {
      this.$root.$emit('my-dialog-show', 'login-form')
    },
  },
}
</script>

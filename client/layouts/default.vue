<template>
  <div class="p-0 w-screen h-screen overflow-hidden bg-primary-900">
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

<template>
  <span>
    {{ animatedNumber | formatNumber }}
  </span>
</template>
<script>
import gsap from 'gsap'
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 2,
    },
  },

  data() {
    return {
      number: 0,
      tweenValue: 0,
    }
  },

  computed: {
    animatedNumber() {
      return this.tweenValue.toFixed(0)
    },
  },

  watch: {
    number(newValue) {
      gsap.to(this.$data, { duration: this.duration, tweenValue: newValue })
    },
  },

  mounted() {
    // For server-side rendering issue
    setTimeout(() => {
      this.number = this.value
    }, 500)
  },
}
</script>

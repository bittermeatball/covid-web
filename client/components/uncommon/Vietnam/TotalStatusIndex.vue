<template>
  <div
    class="absolute z-10 px-8 py-5 animate__animated animate__fadeIn box-border"
    style="
      bottom: 2rem;
      left: 1rem;
      background-color: #00000033;
      border-radius: 30px;
    "
  >
    <h3 class="text-theme-1">
      <span class="font-bold"> Total Confirmed: </span>
      <AnimatedNumber :value="vietnam.cases" :duration="5" class="ml-1" />
    </h3>
    <h3 class="text-theme-1">
      <span class="font-bold"> Total Deaths: </span>
      <AnimatedNumber :value="vietnam.deaths" :duration="5" class="ml-1" />
    </h3>
    <h3 class="text-success">
      <span class="font-bold"> Total Recovered: </span>
      <AnimatedNumber :value="vietnam.recovered" :duration="5" class="ml-1" />
    </h3>
  </div>
</template>
<script>
import { AnimatedNumber } from '~/components/common/Templates/Animate'
export default {
  components: {
    AnimatedNumber,
  },
  props: {
    vietnam: {
      type: Object,
      required: true,
    },
  },
}
</script>

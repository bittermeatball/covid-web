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
      <AnimatedNumber
        :value="global.TotalConfirmed"
        :duration="5"
        class="ml-1"
      />
    </h3>
    <h3 class="text-theme-1">
      <span class="font-bold"> Total Deaths: </span>
      <AnimatedNumber :value="global.TotalDeaths" :duration="5" class="ml-1" />
    </h3>
    <h3 class="text-success">
      <span class="font-bold"> Total Recovered: </span>
      <AnimatedNumber
        :value="global.TotalRecovered"
        :duration="5"
        class="ml-1"
      />
    </h3>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { AnimatedNumber } from '~/components/common/Templates/Animate'
export default {
  components: {
    AnimatedNumber,
  },
  computed: {
    ...mapState({
      global: (state) => state.covid.global,
    }),
  },
}
</script>

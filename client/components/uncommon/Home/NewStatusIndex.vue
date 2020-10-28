<template>
  <div
    class="absolute z-10 px-8 py-5 animate__animated animate__fadeIn box-border"
    style="
      top: 1rem;
      left: 1rem;
      background-color: #00000033;
      border-radius: 30px;
    "
  >
    <h2 class="text-theme-1 text-xl mb-8">
      <p class="leading-3 font-bold">
        <!--  -->
        New Confirmed:
      </p>
      <AnimatedNumber
        :value="global.NewConfirmed"
        :duration="5"
        class="ml-1 text-6xl font-bold"
      />
    </h2>
    <h2 class="text-theme-1 text-xl mb-8">
      <p class="leading-3 font-bold">
        <!--  -->
        New Deaths:
      </p>
      <AnimatedNumber
        :value="global.NewDeaths"
        :duration="5"
        class="ml-1 text-6xl font-bold"
      />
    </h2>
    <h2 class="text-success-600 text-xl">
      <p class="leading-3 font-bold">
        <!--  -->
        New Recovered:
      </p>
      <AnimatedNumber
        :value="global.NewRecovered"
        :duration="5"
        class="ml-1 text-6xl font-bold"
      />
    </h2>
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

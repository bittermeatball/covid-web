<template>
  <el-main class="p-0 h-screen w-screen relative">
    <NewStatusIndex />
    <TotalStatusIndex />
    <!-- Google map is third-party app that only available on client-side -->
    <client-only>
      <GmapMap
        :center="center"
        :zoom="zoom"
        map-type-id="roadmap"
        style="width: 100%; height: 100%"
        :options="options"
      >
        <GmapCircle
          v-for="pin in mapData"
          :key="'circle-' + pin.Slug"
          :center="{
            lat: +pin.lat,
            lng: +pin.lng,
          }"
          :visible="true"
          :radius="renderRadius(pin.TotalConfirmed)"
          :options="{
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
          }"
          @click="pin.windowOpened = !pin.windowOpened"
        >
          {{ pin.TotalConfirmed }}
        </GmapCircle>
        <GmapInfoWindow
          v-for="(pin, index) in mapData"
          :key="'info-window-' + index"
          :opened="pin.windowOpened"
          :position="{
            lat: +pin.lat,
            lng: +pin.lng,
          }"
          :options="{
            pixelOffset: {
              width: 0,
              height: 0,
            },
          }"
        >
          <p class="font-bold text-2xl text-gray-700">
            <el-image
              :src="`https://flagcdn.com/24x18/${pin.CountryCode.toLowerCase()}.png`"
              fit="contain"
              :alt="pin.Slug"
            />
            {{ pin.Country }}
          </p>
          <div class="text-xl text-gray-700 bg-gray-200 rounded-lg p-5 mt-3">
            <p>
              <span class="font-bold"> New confirmed cases:</span>
              <span class="text-primary">
                {{ pin.NewConfirmed | formatNumber }}
              </span>
            </p>
            <p>
              <span class="font-bold"> New deaths:</span>
              <span class="text-danger">
                {{ pin.NewDeaths | formatNumber }}
              </span>
            </p>
            <p>
              <span class="font-bold"> New recovered cases:</span>
              <span class="text-success">
                {{ pin.NewRecovered | formatNumber }}
              </span>
            </p>
          </div>
          <div class="text-gray-700 bg-gray-200 rounded-lg p-5 mt-3">
            <p>
              <span class="font-bold"> Total confirmed cases:</span>
              <span>
                {{ pin.TotalConfirmed | formatNumber }}
              </span>
            </p>
            <p>
              <span class="font-bold"> Total deaths:</span>
              <span>
                {{ pin.TotalDeaths | formatNumber }}
              </span>
            </p>
            <p>
              <span class="font-bold"> Total recovered cases:</span>
              <span>
                {{ pin.TotalRecovered | formatNumber }}
              </span>
            </p>
          </div>
          <div class="text-right">
            <el-button size="mini" type="primary" round class="mt-3">
              <!--  -->
              More details
            </el-button>
          </div>
        </GmapInfoWindow>
      </GmapMap>
    </client-only>
  </el-main>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { covidActions } from '~/constants/vuex/covid'
import { NewStatusIndex, TotalStatusIndex } from '~/components/uncommon/Home'
import { mapConfig } from '~/constants/config/google/map'
export default {
  name: 'Home',
  meta: {
    config: {
      auth: false,
      permission: ['ALL'],
    },
  },
  middleware: ['auth'],
  components: {
    NewStatusIndex,
    TotalStatusIndex,
  },
  async fetch() {
    await this.fetchSummary()
  },
  data() {
    return {
      mapData: [],
      center: { lat: 16.0730755, lng: 108.2114804 },
      zoom: 5,
      options: mapConfig,
    }
  },
  computed: {
    ...mapState({
      locale: (state) => state.locale,
      countries: (state) => state.covid.countries,
    }),
  },
  mounted() {
    this.mapData = this.countries.map((country) => {
      return {
        ...country,
        windowOpened: false,
      }
    })
  },
  methods: {
    ...mapActions({
      fetchSummary: covidActions.FETCH.SUMMARY,
    }),
    renderRadius(total) {
      if (total < 10000) {
        return 10000
      } else if (total < 20000) {
        return 20000
      } else if (total < 50000) {
        return 50000
      } else if (total < 100000) {
        return 100000
      } else if (total < 300000) {
        return 200000
      } else if (total < 600000) {
        return 500000
      } else {
        return 800000
      }
    },
  },
  head() {
    return {
      title: this.$t('home.title'),
    }
  },
}
</script>

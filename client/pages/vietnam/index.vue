<template>
  <el-main class="p-0 h-screen w-screen relative">
    <el-button
      class="absolute z-10"
      style="top: 1rem; left: 50%; transform: translateX(-50%)"
      type="primary"
      round
      @click="$router.push('/')"
    >
      <!--  -->
      Global
    </el-button>
    <NewStatusIndex class="lg:block md:hidden" :vietnam="vietnam" />
    <TotalStatusIndex class="lg:block md:hidden" :vietnam="vietnam" />
    <DataTable :data="vietnamese" />
    <!-- Google map is third-party app that only available on client-side -->
    <client-only>
      <GmapMap
        :center="center"
        :zoom="zoom"
        map-type-id="roadmap"
        style="width: 100%; height: 100%"
        :options="options"
        @zoom_changed="handleZoom"
      >
        <GmapCircle
          v-for="(pin, index) in mapData"
          :key="'circle-' + index"
          :center="{
            lat: +pin.lat,
            lng: +pin.lng,
          }"
          :visible="true"
          :radius="viewZoom"
          :options="{
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
          }"
          @click="pin.windowOpened = !pin.windowOpened"
        />
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
            Patient code: {{ pin.name }}
          </p>
          <div class="text-xl text-gray-700 bg-gray-200 rounded-lg p-5 mt-3">
            <p>
              <span class="font-bold"> Address:</span>
              <span class="text-primary">
                {{ pin.address }}
              </span>
            </p>
            <p>
              <span class="font-bold"> Patient note:</span>
              <span class="text-danger">
                {{ pin.note }}
              </span>
            </p>
          </div>
          <div class="text-gray-700 bg-gray-200 rounded-lg p-5 mt-3">
            <p>
              <span class="font-bold"> Patient group:</span>
              <span>
                {{ pin.patientGroup }}
              </span>
            </p>
            <p>
              <span class="font-bold"> Confirm date:</span>
              <span>
                {{ pin.verifyDate | formatDate }}
              </span>
            </p>
          </div>
        </GmapInfoWindow>
      </GmapMap>
    </client-only>
  </el-main>
</template>
<script>
import { mapState } from 'vuex'
import { covidActions } from '~/constants/vuex/covid'
import {
  NewStatusIndex,
  TotalStatusIndex,
  DataTable,
} from '~/components/uncommon/Vietnam'
import { mapConfig } from '~/constants/config/google/map'
export default {
  name: 'Home',
  components: {
    NewStatusIndex,
    TotalStatusIndex,
    DataTable,
  },
  async asyncData({ store }) {
    await store.dispatch(covidActions.FETCH.VIETNAM)
    await store.dispatch(covidActions.FETCH.VIETNAMESE_PATIENTS)
  },
  data() {
    return {
      mapData: [],
      center: { lat: 16.0730755, lng: 108.2114804 },
      zoom: 6,
      viewZoom: 1000000 / (6 * 6 * 6), // 1000000 / (zoom * zoom * zoom)
      options: mapConfig,
    }
  },
  computed: {
    ...mapState({
      locale: (state) => state.locale,
      vietnam: (state) => state.covid.vietnam,
      vietnamese: (state) => state.covid.vietnamese,
    }),
  },
  mounted() {
    this.mapData = this.vietnamese.map((person) => {
      return {
        ...person,
        windowOpened: false,
      }
    })
  },
  methods: {
    handleZoom(zoom) {
      this.viewZoom = 1000000 / (zoom * zoom * zoom)
    },
  },
  head() {
    return {
      title: this.$t('home.title'),
    }
  },
}
</script>

<template>
  <el-table
    :data="data"
    :default-sort="{ prop: 'name', order: 'ascending' }"
    max-height="400"
    header-cell-class-name="bg-theme-2-700 text-theme-1 border-none"
    cell-class-name="bg-theme-2-700 text-theme-1 border-none"
    :stripe="false"
    :border="false"
    class="absolute z-10 animate__animated animate__fadeIn box-border bg-none rounded-lg"
    style="top: 50%; right: 1rem; transform: translateY(-50%); width: 320px"
  >
    <el-table-column prop="name" label="Name" sortable>
      <template slot-scope="scope">
        <el-popover ref="popover" trigger="hover" placement="top">
          <p class="font-bold text-2xl text-gray-700">
            Patient code: {{ scope.row.name }}
          </p>
          <div class="text-xl text-gray-700 bg-gray-200 rounded-lg p-5 mt-3">
            <p>
              <span class="font-bold"> Address:</span>
              <span class="text-primary">
                {{ scope.row.address }}
              </span>
            </p>
            <p>
              <span class="font-bold"> Patient note:</span>
              <span class="text-danger">
                {{ scope.row.note }}
              </span>
            </p>
          </div>
          <div class="text-gray-700 bg-gray-200 rounded-lg p-5 mt-3">
            <p>
              <span class="font-bold"> Patient group:</span>
              <span>
                {{ scope.row.patientGroup }}
              </span>
            </p>
            <p>
              <span class="font-bold"> Confirm date:</span>
              <span>
                {{ scope.row.verifyDate | formatDate }}
              </span>
            </p>
          </div>
        </el-popover>
        <span v-popover:popover class="cursor-pointer font-bold">
          {{ scope.row.name }}
        </span>
      </template>
    </el-table-column>
    <el-table-column prop="patientGroup" label="Group" sortable />
    <el-table-column prop="verifyDate" label="Date" sortable>
      <template slot-scope="scope">
        {{ scope.row.verifyDate | formatDate }}
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
}
</script>
<style lang="scss">
.el-table::before {
  display: none;
}
.el-table th.gutter,
.el-table td.gutter {
  display: none;
}
</style>

<template>
  <el-select class="color-group-select" :value="colorGroupType" placeholder="请选择范围颜色" :popper-append-to-body="false" @change="onColorGroupTypeChange">
    <el-option v-for="item in colorGroupOptions" :key="item.type" :label="item.label" :value="item.type">
      <div class="color-group">
        <ul>
          <li
            v-for="color in item.value"
            :style="{
              background: color,
            }"
            :key="color"
          ></li>
        </ul>
        <span>{{ item.label }}</span>
      </div>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'BaseColorGroupSelect',
  props: {
    colorGroupOptions: {
      type: Array,
      default: () => [],
    },
    colorGroupType: {
      type: String,
      default: '',
    },
  },

  methods: {
    onColorGroupTypeChange(val) {
      this.$emit('colorGroupTypeChange', val)
    },
  },
}
</script>

<style lang="less" scoped>
.color-group-select {
  .color-group {
    display: flex;
    justify-content: space-between;

    ul {
      display: flex;
      align-items: center;
      padding: unset;

      > li {
        height: 18px;
        width: 18px;
        border: 1px solid #fff;
        margin-left: -1px;

        &:first-child {
          margin-right: 12px;
        }
      }
    }

    > span {
      margin-left: 12px;
      font-size: 12px;
      align-items: center;
      justify-content: space-between;
    }
  }

  ::v-deep {
    .el-select-dropdown__item {
      padding: 0 10px;
    }
  }
}
</style>

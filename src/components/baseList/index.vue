<template>
  <div class="base-list">
    <template v-if="showTitle">
      <header class="title">
        <slot name="title">
          {{ title }}
        </slot>
      </header>
    </template>

    <div class="list">
      <template v-if="data.length">
        <div class="item" @click="onClick(item)" v-for="item in data" :key="item[defaultProps.idKey]"
          :class="{ active: item[defaultProps.idKey] == currentActive }">
          <slot name="content" :item="item">
            <div class="custom-content">
              <span>{{ item[defaultProps.nameKey] }}</span>
              <span v-if="subContentKey">{{ item[subContentKey] }}</span>
            </div>
          </slot>
        </div>
      </template>
      <template v-else>
        <el-empty></el-empty>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {},
    data: {},
    showTitle: {
      type: Boolean,
      default: true
    },
    subContentKey: {},
    defaultProps: {
      type: Object,
      default: () => {
        return {
          'nameKey': 'name',
          "idKey": "id"
        }
      }
    }
  },
  watch: {
    currentActive(newValue, oldValue) {
      this.$emit("change", newValue);
    },
    data() {
      this.setDefault();
    }
  },
  mounted() {
    this.setDefault();
  },
  data() {
    return {
      currentActive: ""
    };
  },
  methods: {
    setDefault() {
      if (this.data && this.data.length) {
        this.currentActive = this.data[0][this.defaultProps.idKey];
      } else {
        this.currentActive = "";
      }
    },
    onClick(item) {
      this.currentActive = item[this.defaultProps.idKey];
    }
  }
};
</script>

<style lang="less" scoped>

.base-list {
  height: 100%;
  border: 1px @border-type @border-color--primary;
  width: 260px;

  &+& {
    margin-left: 5px;
  }

  .title {
    background-color: @layout-bg-color;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: @font-color--primary;
    border-bottom: 1px @border-type @border-color--primary;
    font-weight: bold;
    letter-spacing: 2px;
  }

  .list {
    height: calc(100% - 40px);
    overflow-y: auto;
    background-color: @layout-bg-color;

    >.item {
      width: 100%;
      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 10px 5px;

      &:hover,
      &.active {
        background-color: @bg-color--primary;
        color: @white-color;
        cursor: pointer;

        .custom-content span+span {
          color: @white-color;
        }
      }

      .custom-content {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        span+span {
          font-size: 12px;
          color: #bbb;
        }
      }
    }
  }
}
</style>

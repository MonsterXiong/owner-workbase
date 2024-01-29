<template>
  <div class="layout-page">
    <div style="display:flex;height:100%">
      <div style="flex:1" class="ant-row">
        <div class="ant-col ant-col-8" v-for="item in 3" :key="item">
          <div class="card-box">
            <div class="card-title">Step 1：选择数据源</div>
            <div class="ant-divider ant-divider-horizontal" style="margin:8px 0"></div>
            <ul class="gi-radio-note">
              <li v-for="(item,index) in 4" :key="index">
                <div class="icon1">
                  <span role="img" aria-label="folder-view" class="anticon anticon-folder-view">
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      data-icon="folder-view"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M309.1 554.3a42.92 42.92 0 000 36.4C353.3 684 421.6 732 512.5 732s159.2-48.1 203.4-141.3c5.4-11.5 5.4-24.8.1-36.3l-.1-.1-.1-.1C671.7 461 603.4 413 512.5 413s-159.2 48.1-203.4 141.3zM512.5 477c62.1 0 107.4 30 141.1 95.5C620 638 574.6 668 512.5 668s-107.4-30-141.1-95.5c33.7-65.5 79-95.5 141.1-95.5z"
                      />
                      <path d="M457 573a56 56 0 10112 0 56 56 0 10-112 0z" />
                      <path
                        d="M880 298.4H521L403.7 186.2a8.15 8.15 0 00-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32zM840 768H184V256h188.5l119.6 114.4H840V768z"
                      />
                    </svg>
                  </span>
                </div>
                <div class="name">样例数据</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.layout-page {
  --layout-background-color: hsla(290, 0%, 93%, 1);
  --layout-background: radial-gradient(at 32% 3%, hsla(156, 50%, 31%, 0.15) 0px, transparent 50%),
    radial-gradient(at 99% 73%, hsla(156, 100%, 50%, 0.1) 0px, transparent 50%), radial-gradient(at 0% 96%, hsla(154, 100%, 53%, 0.3) 0px, transparent 50%);
  --background-color-transparent: rgba(255, 255, 255, 0.6);
  --text-color: #000a1aad;
  --primary-color-opacity-1: rgba(39, 118, 88, 0.1);
}
.layout-page {
  height: 100%;
  background-color: var(--layout-background-color);
  background-image: var(--layout-background);
}

.ant-row {
  display: flex;
  flex-flow: row wrap;
  min-width: 0;
}

.ant-col-8 {
  display: block;
  flex: 0 0 33.33333333%;
  max-width: 33.33333333%;
}
.ant-col {
  position: relative;
  max-width: 100%;
  min-height: 1px;
}
.card-box {
  background: var(--background-color-transparent);
  border-radius: 8px;
  margin: 8px;
  text-align: center;
  padding: 24px 0px;
}

.card-title {
  font-size: 16px;
  margin-bottom: 12px;
}

.ant-divider-horizontal {
  display: flex;
  clear: both;
  width: 100%;
  min-width: 100%;
}
.ant-divider {
  box-sizing: border-box;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum';
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

ul.gi-radio-note {
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
}

ul.gi-radio-note > li {
  list-style: none;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  width: 80px;
  display: inline-block;
  margin-right: 12px;
  color: var(--text-color);
  transition: all 0.3 ease;
}
ul.gi-radio-note > li .name {
  text-align: center;
  font-size: 12px;
}

ul.gi-radio-note > li .icon1 {
  text-align: center;
  font-size: 36px;
}

ul.gi-radio-note > li:hover {
  background: var(--primary-color-opacity-1);
  cursor: pointer;
  border-radius: 6px;
}

.right {
  width: 270px;
  background: var(--background-color-transparent);;
  margin: 8px;
  border: 1px solid #f0f0f0;
  padding: 0 24px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 16px;
  border-radius: 8px;
}
</style>


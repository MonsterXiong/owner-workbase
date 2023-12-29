<template>
  <div class="nav-card-comp">
    <template v-for="(listItem, listIndex) in list">
      <template v-if="listItem.navList?.length">
        <template v-if="list.length > 1">
          <div class="group-title" :key="listIndex">{{ listItem.name }}</div>
        </template>
        <div class="wrapper" :key="listIndex + 'x'">
          <div class="nav-card" @click="onClick(item)" v-for="item in listItem.navList" :key="item.navId">
            <div class="main" :class="{ 'loney': item.tagList.length <= 1 }">
              <header>
                {{ item.name }}
                <span v-if="item.code">【{{ item.code }}】</span>
              </header>
              <template v-if="item.repo">
                <span class="git-icon" @click.stop="onGoGit(item.repo)">git</span>
              </template>
            </div>
            <template v-if="item.tagList.length > 1">
              <footer class="tag-wrapper">
                <span class="tagItem" @click="onTagClick(tag)" v-for="tag in item.tagList" :key="tag.tagId">{{ tag.name
                }}</span>
              </footer>
            </template>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import NavCardItem from './NavCardItem'
export default {
  props: {
    list: {
    },
  },
  components: {
    // NavCardItem,
  },
  methods: {
    onGoGit(repoUrl) {
      window.open(repoUrl);
    },
    onClick(navItem) {
      if (navItem.tagList.length == 1) {
        window.open(navItem.tagList[0].url);
      }
    },
    onTagClick(tag) {
      window.open(tag.url);
    }
  },
}
</script>

<style lang="less" scoped>
.nav-card-comp {
  height: 100%;
  overflow-y: auto;

  .group-title {
    line-height: 36px;
    padding-left: 10px;
    font-size: 20px;
    font-weight: bolder;
    color: @font-color--primary;
    // background-color:@bg-color--primary;
    // color:@white-color;
    // text-align:center
  }
}

.wrapper {
  padding: 10px;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
}

@media screen and (min-width: 1960px) {
  .wrapper {
    grid-template-columns: repeat(9, 1fr);
  }
}

@media screen and (max-width: 1920px) {
  .wrapper {
    grid-template-columns: repeat(7, 1fr);
  }
}

@media screen and (max-width: 1280px) {
  .wrapper {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media screen and (max-width: 1024px) {
  .wrapper {
    grid-template-columns: repeat(4, 1fr);
  }
}

.nav-card {
  display: flex;
  flex-direction: column;
  border: 1px @border-type @border-color--primary;
  width: 100%;
  height: 100px;
  border-radius: 6px;
  overflow: hidden;
  background: @white-color;

  .main {
    flex: 1;
    width: 100%;
    padding: 5px 5px 0 5px;
    display: grid;
    place-items: center;
    position: relative;

    &.loney {
      header {
        &:hover {
          transform: scale(2)
        }
      }
    }

    .git-icon {
      position: absolute;
      right: 0;
      top: 0;
      padding: 2px;
      &:hover{
        cursor: pointer;
      }
    }
  }

  header {
    font-size: 16px;
    line-height: 30px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 180px;
    max-width: calc(100% - 1px);
    color: @font-color--primary;
    text-align: center;

    &:hover {
      transform: scale(1.2);
      cursor: pointer;
    }
  }
}

.tag-wrapper {
  margin-top: auto;
  line-height: 36px;
  display: flex;
  width: 100%;
  font-size: 14px;

  .tagItem {
    text-align: center;
    flex: 1;
    border-top: 1px @border-type @border-color--primary;
    color: @font-color--primary;

    &:hover {
      cursor: pointer;
      background: @bg-color--primary;
      color: @white-color;
      // color: @font-color--primary;
      font-weight: bold;
    }

    &+.tagItem {
      border-left: 1px @border-type @border-color--primary;
    }
  }
}</style>

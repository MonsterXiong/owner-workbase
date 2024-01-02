<template>
  <div class="common-page gen-project-page">
    <BaseList title="数据池" subContentKey="databaseType" :data="poolList" :defaultProps="poolProps" @change="onPoolChange">
    </BaseList>
    <BaseList title="数据库" subContentKey="comment" :data="currentDatabaseList" :defaultProps="databaseProps"
      @change="onDatabseChange"></BaseList>
    <BaseList title="数据库表" subContentKey="comment" :data="currentTableList" :defaultProps="tableProps"
      @change="onTableChange"></BaseList>
    <div class="table-wrapper">
      <FieldTable :tableData="currentFieldList"></FieldTable>
    </div>
  </div>
</template>

<script>
import BaseList from "@/components/baseList";
import FieldTable from "./components/FieldTable";
import { getDatabaseData, getFieldData } from "@/services/database.js";
export default {
  components: {
    BaseList,
    FieldTable
  },
  data() {
    return {
      currentActivePoolId: "",
      currentActiveDatabaseId: "",
      currentActiveTableId: "",
      poolProps: {
        nameKey: "name",
        idKey: "poolId"
      },
      databaseProps: {
        nameKey: "name",
        idKey: "name"
      },
      tableProps: {
        nameKey: "name",
        idKey: "name"
      },
      currentDatabaseList: [],
      currentTableList: [],
      currentFieldList: [],
      poolList: [],
      databaseList: [
        {
          poolId: 1,
          databaseId: 1,
          name: "nbpg_db",
        },
        {
          poolId: 2,
          databaseId: 2,
          name: "lowcode_db",
        }
      ],
      tableList: [
        {
          databaseId: 1,
          tableId: 1,
          // 表名
          name: "account",
          // 注释
          comment: "账户"
        }
      ],
      filedList: [
        {
          tableId: 1,
          // 名称
          name: "id",
          // 数据类型 需要定义并转换为nodejs
          type: "INT",
          // 长度/集合
          length: "11",
          // 允许为空
          isNull: false,
          // 默认值
          defaultValue: "",
          // 注释
          comment: "主键",
          // 主键
          isPrimary: true
          // // 自增
          // isAutoIncrement:'',
          // // 唯一
          // isUnique:'',
          // // 外键
          // foreignKey:'',
          // // 外键表
          // foreignKeyTable:'',
          // // 外键字段
          // foreignKeyField:'',
          // // 外键更新
          // foreignKeyUpdate:'',
          // // 外键删除
          // foreignKeyDelete:'',
        },
        {
          tableId: 1,
          name: "code",
          type: "VARCHAT",
          length: "255",
          isNull: false,
          defaultValue: "",
          comment: "数据编码",
          isPrimary: false
        },
        {
          tableId: 1,
          name: "name",
          type: "VARCHAT",
          length: "255",
          isNull: false,
          defaultValue: "",
          comment: "数据名称",
          isPrimary: false
        },
        {
          tableId: 1,
          name: "aliasName",
          type: "VARCHAT",
          length: "255",
          isNull: true,
          defaultValue: "",
          comment: "数据别名",
          isPrimary: false
        }
      ],
      // 测试数据
      projectList: [
        {
          projectId: 1,
          name: "项目名称",
          // 别名
          // alias:''
          // 数据源
          databseId: 1
          // 项目介绍
          // introduction:'项目介绍',
          // 项目的配置项
          // 具备哪些布局项
        }
      ],
      pageList: [
        {
          projectId: 1,
          pageId: 1,
          // 页面名称
          name: "页面名称",
          // 页面介绍
          introduction: "页面介绍"
          // 页面的配置项
          // 页面类型 =页面路由=是否放置默认布局等等
        }
      ]

      // 系统基础功能需要集成
      // 登录、鉴权、日志、数据字典、菜单、RBAC

      // 发布、预览等等
    };
  },
  async mounted() {
    await this.init();
  },
  methods: {
    async init() {
      const poolList = this.getPoolList();

      this.poolList = poolList
    },
    async getData(config) {
      const { data } = await getDatabaseData(config);
      const { databaseList, tableList } = data
      this.databaseList = databaseList
      this.tableList = tableList
    },
    getPoolList() {
      return [
        {
          poolId: 1,
          name: "204",
          host: "localhost",
          port: "3306",
          username: "root",
          password: "123456",
          type: "mysql",
          // 随便一个必须有的
          // databseName: "test",
          createIp: ""
          // 所有表必须有排序字段、code标识、更新时间、创建时间、软删除、创建者
        },
        {
          poolId: 2,
          name: "200",
          host: "localhost",
          port: "3306",
          username: "root",
          password: "123456",
          type: "mysql"
          // 随便一个必须有的
          // databseName:"test"
        }
      ];
    },
    async onPoolChange(poolId) {
      this.currentActivePoolId = poolId;
      const config = this.poolList.find(item => item.poolId == poolId)
      await this.getData(config)
      this.currentDatabaseList = this.databaseList.filter(
        item => item.poolId == poolId
      );
    },
    onDatabseChange(databaseId) {
      this.currentActiveDatabaseId = databaseId;
      this.currentTableList = this.tableList.filter(
        item => item.databaseId == databaseId
      );
    },
    async onTableChange(tableId) {
      this.currentActiveTableId = tableId;
      const {data}  = await getFieldData(this.currentActiveDatabaseId, this.currentActiveTableId)
      this.currentFieldList  = data
    }
  }
};
</script>

<style lang="less" scoped>
.gen-project-page {
  display: flex;
}

.table-wrapper {
  width: calc(100% - 780px);
  height: 100%;
  border: 1px @border-type @border-color--primary;
  margin-left: 5px
}
</style>

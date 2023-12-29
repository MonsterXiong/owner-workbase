import { nanoid } from 'nanoid'

export const CATEGORY_TYPE = {
  ALL: 'all',
  PRODUCT: 'product',
  TOOL: 'tool',
  LOWCODE: 'lowcode',
  AQ: 'aq',
  OWNER: 'owner'
}

export const categoryList = [{
  id: '',
  code: CATEGORY_TYPE.ALL,
  name: '全部',
  desc: ''
}, {
  id: 'toolId',
  code: CATEGORY_TYPE.TOOL,
  name: '工具地址',
  desc: ''
}, {
  id: '',
  code: CATEGORY_TYPE.PRODUCT,
  name: '产品',
  desc: ''
}, {
  id: 'lowcodeId',
  code: CATEGORY_TYPE.LOWCODE,
  name: '基于低代码',
  desc: ''
}, {
  id: 'aqId',
  code: CATEGORY_TYPE.AQ,
  name: '基于能力评估',
  desc: ''
}, {
  id: 'ownerId',
  code: CATEGORY_TYPE.OWNER,
  name: '独立项目',
  desc: ''
}]

export const urlList = [
  {
    categoryId: CATEGORY_TYPE.TOOL,
    navId: nanoid(),
    name: "atlassian",
    repo: "https://github.com/",
    tagList: [
      {
        tagId: nanoid(),
        url: "http://www.baidu.com",
        name: "GIT"
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.TOOL,
    navId: nanoid(),
    name: "atlassian",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        url: "http://www.baidu.com",
        name: "GIT"
      }, {
        tagId: nanoid(),
        url: "http://www.baidu.com",
        name: "SVN"
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.TOOL,
    navId: nanoid(),
    name: "atlassian",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        url: "http://www.baidu.com",
        name: "GIT"
      }, {
        tagId: nanoid(),
        url: "http://www.baidu.com",
        name: "SVN"
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.TOOL,
    navId: nanoid(),
    name: "atlassian",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        url: "http://www.baidu.com",
        name: "GIT"
      }, {
        tagId: nanoid(),
        url: "http://www.baidu.com",
        name: "SVN"
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.TOOL,
    navId: nanoid(),
    name: "atlassian",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        url: "http://www.baidu.com",
        name: "GIT"
      }, {
        tagId: nanoid(),
        url: "http://www.baidu.com",
        name: "SVN"
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.TOOL,
    navId: nanoid(),
    name: "版本控制",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        url: "http://www.baidu.com",
        name: "GIT"
      }, {
        tagId: nanoid(),
        url: "http://www.baidu.com",
        name: "SVN"
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.TOOL,
    navId: nanoid(),
    name: "文件输入输出平台",
    code: "",
    type: "Project",
    iconName: "",
    bgUrl: "",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        name: "内部",
        icon: "",
        url: "",
        sortNum: 1
      },
      {
        tagId: nanoid(),
        name: "VM",
        icon: "",
        url: "",
        sortNum: 2
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.TOOL,
    navId: nanoid(),
    name: "禅道",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        url: "http://www.baidu.com",
        name: "禅道"
      },
      {
        tagId: nanoid(),
        url: "http://www.baidu.com",
        name: "工作统计"
      },
    ]
  },
  {
    categoryId: CATEGORY_TYPE.LOWCODE,
    navId: nanoid(),
    name: "体系建模",
    code: "txjm",
    type: "Project",
    iconName: "",
    bgUrl: "",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        name: "前端",
        icon: "",
        url: "",
        sortNum: 1
      },
      {
        tagId: nanoid(),
        name: "后端",
        icon: "",
        url: "",
        sortNum: 2
      },
      {
        tagId: nanoid(),
        name: "文档",
        icon: "",
        url: "",
        sortNum: 3
      },
      {
        tagId: nanoid(),
        name: "日志",
        icon: "",
        url: "",
        sortNum: 4
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.LOWCODE,
    navId: nanoid(),
    name: "互操作",
    code: "hcz",
    type: "Project",
    iconName: "",
    bgUrl: "",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        name: "前端",
        icon: "",
        url: "",
        sortNum: 1
      },
      {
        tagId: nanoid(),
        name: "后端",
        icon: "",
        url: "",
        sortNum: 2
      },
      {
        tagId: nanoid(),
        name: "文档",
        icon: "",
        url: "",
        sortNum: 3
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.LOWCODE,
    navId: nanoid(),
    name: "KYJM",
    code: "",
    type: "Project",
    iconName: "",
    bgUrl: "",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        name: "前端",
        icon: "",
        url: "",
        sortNum: 1
      },
      {
        tagId: nanoid(),
        name: "后端",
        icon: "",
        url: "",
        sortNum: 2
      },
      {
        tagId: nanoid(),
        name: "文档",
        icon: "",
        url: "",
        sortNum: 3
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.LOWCODE,
    navId: nanoid(),
    name: "需求分析",
    code: "",
    type: "Project",
    iconName: "",
    bgUrl: "",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        name: "前端",
        icon: "",
        url: "",
        sortNum: 1
      },
      {
        tagId: nanoid(),
        name: "后端",
        icon: "",
        url: "",
        sortNum: 2
      },
      {
        tagId: nanoid(),
        name: "文档",
        icon: "",
        url: "",
        sortNum: 3
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.LOWCODE,
    navId: nanoid(),
    name: "智慧架构",
    code: "zhjg",
    type: "Project",
    iconName: "",
    bgUrl: "",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        name: "前端",
        icon: "",
        url: "",
        sortNum: 1
      },
      {
        tagId: nanoid(),
        name: "后端",
        icon: "",
        url: "",
        sortNum: 2
      },
      {
        tagId: nanoid(),
        name: "文档",
        icon: "",
        url: "",
        sortNum: 3
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.LOWCODE,
    navId: nanoid(),
    name: "航天3院",
    code: "",
    type: "Project",
    iconName: "",
    bgUrl: "",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        name: "前端",
        icon: "",
        url: "",
        sortNum: 1
      },
      {
        tagId: nanoid(),
        name: "后端",
        icon: "",
        url: "",
        sortNum: 2
      },
      {
        tagId: nanoid(),
        name: "文档",
        icon: "",
        url: "",
        sortNum: 3
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.AQ,
    navId: nanoid(),
    name: "能力评估",
    code: "aq",
    type: "Project",
    iconName: "",
    bgUrl: "",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        name: "前端",
        icon: "",
        url: "",
        sortNum: 1
      },
      {
        tagId: nanoid(),
        name: "后端",
        icon: "",
        url: "",
        sortNum: 2
      },
      {
        tagId: nanoid(),
        name: "文档",
        icon: "",
        url: "",
        sortNum: 3
      },
      {
        tagId: nanoid(),
        name: "日志",
        icon: "",
        url: "",
        sortNum: 4
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.AQ,
    navId: nanoid(),
    name: "能力评估-达梦",
    code: "aq",
    type: "Project",
    iconName: "",
    bgUrl: "",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        name: "前端",
        icon: "",
        url: "",
        sortNum: 1
      },
      {
        tagId: nanoid(),
        name: "后端",
        icon: "",
        url: "",
        sortNum: 2
      },
      {
        tagId: nanoid(),
        name: "文档",
        icon: "",
        url: "",
        sortNum: 3
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.OWNER,
    navId: nanoid(),
    name: "南部评估",
    code: "nbpg",
    type: "Project",
    iconName: "",
    bgUrl: "",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        name: "前端",
        icon: "",
        url: "",
        sortNum: 1
      },
      {
        tagId: nanoid(),
        name: "后端",
        icon: "",
        url: "",
        sortNum: 2
      },
      {
        tagId: nanoid(),
        name: "文档",
        icon: "",
        url: "",
        sortNum: 3
      },
      {
        tagId: nanoid(),
        name: "日志",
        icon: "",
        url: "",
        sortNum: 4
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.OWNER,
    navId: nanoid(),
    name: "哈工大分析",
    code: "aq",
    type: "Project",
    iconName: "",
    bgUrl: "",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        name: "前端",
        icon: "",
        url: "",
        sortNum: 1
      },
      {
        tagId: nanoid(),
        name: "后端",
        icon: "",
        url: "",
        sortNum: 2
      },
      {
        tagId: nanoid(),
        name: "文档",
        icon: "",
        url: "",
        sortNum: 3
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.OWNER,
    navId: nanoid(),
    name: "ssl4院-1",
    code: "aq",
    type: "Project",
    iconName: "",
    bgUrl: "",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        name: "前端",
        icon: "",
        url: "",
        sortNum: 1
      },
      {
        tagId: nanoid(),
        name: "后端",
        icon: "",
        url: "",
        sortNum: 2
      },
      {
        tagId: nanoid(),
        name: "文档",
        icon: "",
        url: "",
        sortNum: 3
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.OWNER,
    navId: nanoid(),
    name: "ssl4院-2",
    code: "aq",
    type: "Project",
    iconName: "",
    bgUrl: "",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        name: "前端",
        icon: "",
        url: "",
        sortNum: 1
      },
      {
        tagId: nanoid(),
        name: "后端",
        icon: "",
        url: "",
        sortNum: 2
      },
      {
        tagId: nanoid(),
        name: "文档",
        icon: "",
        url: "",
        sortNum: 3
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.OWNER,
    navId: nanoid(),
    name: "ssl4院-3",
    code: "aq",
    type: "Project",
    iconName: "",
    bgUrl: "",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        name: "前端",
        icon: "",
        url: "",
        sortNum: 1
      },
      {
        tagId: nanoid(),
        name: "后端",
        icon: "",
        url: "",
        sortNum: 2
      },
      {
        tagId: nanoid(),
        name: "文档",
        icon: "",
        url: "",
        sortNum: 3
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.OWNER,
    navId: nanoid(),
    name: "zxl2期",
    code: "aq",
    type: "Project",
    iconName: "",
    bgUrl: "",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        name: "前端",
        icon: "",
        url: "",
        sortNum: 1
      },
      {
        tagId: nanoid(),
        name: "后端",
        icon: "",
        url: "",
        sortNum: 2
      },
      {
        tagId: nanoid(),
        name: "文档",
        icon: "",
        url: "",
        sortNum: 3
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.OWNER,
    navId: nanoid(),
    name: "自动部署",
    code: "aq",
    type: "Project",
    iconName: "",
    bgUrl: "",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        name: "前端",
        icon: "",
        url: "",
        sortNum: 1
      },
      {
        tagId: nanoid(),
        name: "后端",
        icon: "",
        url: "",
        sortNum: 2
      },
      {
        tagId: nanoid(),
        name: "文档",
        icon: "",
        url: "",
        sortNum: 3
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.OWNER,
    navId: nanoid(),
    name: "国防分析",
    code: "aq",
    type: "Project",
    iconName: "",
    bgUrl: "",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        name: "前端",
        icon: "",
        url: "",
        sortNum: 1
      },
      {
        tagId: nanoid(),
        name: "后端",
        icon: "",
        url: "",
        sortNum: 2
      },
      {
        tagId: nanoid(),
        name: "文档",
        icon: "",
        url: "",
        sortNum: 3
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.PRODUCT,
    navId: nanoid(),
    name: "体系设计工具",
    code: "txsjgj",
    type: "Project",
    iconName: "",
    bgUrl: "",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        name: "前端",
        icon: "",
        url: "",
        sortNum: 1
      },
      {
        tagId: nanoid(),
        name: "后端",
        icon: "",
        url: "",
        sortNum: 2
      },
      {
        tagId: nanoid(),
        name: "文档",
        icon: "",
        url: "",
        sortNum: 3
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.PRODUCT,
    navId: nanoid(),
    name: "流程执行",
    code: "flow",
    type: "Project",
    iconName: "",
    bgUrl: "",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        name: "前端",
        icon: "",
        url: "",
        sortNum: 1
      },
      {
        tagId: nanoid(),
        name: "后端",
        icon: "",
        url: "",
        sortNum: 2
      },
      {
        tagId: nanoid(),
        name: "文档",
        icon: "",
        url: "",
        sortNum: 3
      }
    ]
  },
  {
    categoryId: CATEGORY_TYPE.PRODUCT,
    navId: nanoid(),
    name: "作战概念",
    code: "zzgn",
    type: "Project",
    iconName: "",
    bgUrl: "",
    repo: "",
    tagList: [
      {
        tagId: nanoid(),
        name: "前端",
        icon: "",
        url: "",
        sortNum: 1
      },
      {
        tagId: nanoid(),
        name: "后端",
        icon: "",
        url: "",
        sortNum: 2
      },
      {
        tagId: nanoid(),
        name: "文档",
        icon: "",
        url: "",
        sortNum: 3
      }
    ]
  },

]

const permissionList = [
  {
    routePath: '/modelManage',
    routeName: 'modelManage',
    component: 'modelManage/index',
    hidden: false, //是否在侧边栏显示
    meta: {
      title: '模型管理', //侧边菜单名称
      icon: 'el-icon-document',

      button: [], // 用来存放按钮权限
    },
    children: [
      {
        routePath: '/modelManage/subjectModel',
        routeName: 'subjectModel',
        component: 'modelManage/subjectModel',
        hidden: false,
        meta: {
          title: '主体模型',
          icon: 'el-icon-document',

          button: [],
        },
      },
    ],
  },
  {
    routePath: '/modelDetail/index',
    routeName: 'modelDetail',
    component: 'modelDetail/index',
    hidden: false,
    meta: {
      title: '模型详情',
      icon: 'el-icon-document',

      button: [],
    },
    children: [
      {
        routePath: '/modelDetail/variableDefinition',
        routeName: 'variableDefinition',
        component: 'modelDetail/variableDefinition',
        hidden: false,
        meta: {
          title: '指标定义',
          icon: 'el-icon-document',

          button: [],
        },
      },
      {
        routePath: '/modelDetail/ruleComponent',
        routeName: 'ruleComponent',
        component: 'modelDetail/ruleComponent',
        hidden: false,
        meta: {
          title: '规则组件',
          icon: 'el-icon-document',

          button: [],
        },
      },
    ],
  },
  {
    routePath: '/configManage',
    routeName: 'configManage',
    component: 'configManage/index',
    hidden: false,
    meta: {
      title: '配置管理',
      icon: 'el-icon-document',

      button: [],
    },
    children: [
      {
        routePath: '/configManage/codeTable',
        routeName: 'codeTable',
        component: 'configManage/codeTable',
        hidden: false,
        meta: {
          title: '码值表',
          icon: 'el-icon-document',

          button: [],
        },
      },
      {
        routePath: '/configManage/funcDefinition',
        routeName: 'funcDefinition',
        component: 'configManage/funcDefinition',
        hidden: false,
        meta: {
          title: '函数定义',
          icon: 'el-icon-document',

          button: [],
        },
      },
      {
        routePath: '/configManage/indicatorDefinition',
        routeName: 'indicatorDefinition',
        component: 'configManage/indicatorDefinition',
        hidden: false,
        meta: {
          title: '指标定义',
          icon: 'el-icon-document',

          button: [],
        },
      },
    ],
  },
  {
    routePath: '/systemManage',
    routeName: 'systemManage',
    component: 'systemManage/index',
    hidden: false,
    meta: {
      title: '系统管理',
      icon: 'el-icon-document',
      button: [],
    },
    children: [
      {
        routePath: '/systemManage/orgManage',
        routeName: 'orgManage',
        component: 'systemManage/orgManage',
        hidden: false,
        meta: {
          title: '机构管理',
          icon: 'el-icon-document',
          button: [],
        },
      },
      {
        routePath: '/systemManage/roleManage',
        routeName: 'roleManage',
        component: 'systemManage/roleManage',
        hidden: false,
        meta: {
          title: '角色管理',
          icon: 'el-icon-document',
          button: [],
        },
      },
      {
        routePath: '/systemManage/userManage',
        routeName: 'userManage',
        component: 'systemManage/userManage',
        hidden: false,
        meta: {
          title: '用户管理',
          icon: 'el-icon-document',
          button: [],
        },
      },
    ],
  },
]
export default permissionList

let sessionStore = window.sessionStorage.getItem('store')
const dynamicRoutes = sessionStore ? JSON.parse(sessionStore).dynamicRoutes : []
const token = sessionStore.token || ''

const state = {
  token,
  systemUser: 'systemUser',
  systemOrg: 'systemOrg',
  menuId: '10010',
  modelMenuList: [{ menuId: '10010', menuName: '主体模型' }],
  packageId: '',
  packageCode: '',
  ruleComp: {
    ruleCompId: '',
    typeName: '',
  },
  routerType: '',
  // 菜单路由
  dynamicRoutes: dynamicRoutes,
  permissionMap: {
    List: 'CR', //增加、读取
    Detail: 'CURD', //增删改查
  },
}
export default state

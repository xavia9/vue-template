let sessionStore = window.sessionStorage.getItem('store')
const dynamicRoutes = sessionStore ? JSON.parse(sessionStore).dynamicRoutes : []

const state = {
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
}
export default state

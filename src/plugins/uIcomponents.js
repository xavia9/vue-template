import Vue from 'vue'

import {
  Row,
  Col,
  Container,
  Header,
  Main,
  Aside,
  Menu,
  MenuItem,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Table,
  TableColumn,
  Pagination,
  Button,
  ButtonGroup,
  Tag,
  Switch,
  Tooltip,
  DatePicker,
  Upload,
  Dialog,
  Message,
  MessageBox,
} from 'element-ui'

const components = {
  Row,
  Col,
  Container,
  Header,
  Main,
  Aside,
  Menu,
  MenuItem,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Table,
  TableColumn,
  Pagination,
  Button,
  ButtonGroup,
  Tag,
  Switch,
  Tooltip,
  DatePicker,
  Upload,
  Dialog,
  Message,
  MessageBox,
}

function install(Vue) {
  Object.keys(components).forEach((key) => Vue.use(components[key]))
}

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

export default { install }

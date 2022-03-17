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

Vue.use(Row)
  .use(Col)
  .use(Container)
  .use(Header)
  .use(Main)
  .use(Aside)
  .use(Menu)
  .use(MenuItem)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Select)
  .use(Option)
  .use(Table)
  .use(TableColumn)
  .use(Pagination)
  .use(Button)
  .use(ButtonGroup)
  .use(Tag)
  .use(Switch)
  .use(Tooltip)
  .use(DatePicker)
  .use(Upload)
  .use(Dialog)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

import Vue from 'vue';
import {
  Button,
  Table,
  TableColumn,
  Pagination,
  Tag,
  Switch,
  Tooltip,
  DatePicker,
} from 'element-ui';

Vue.use(Table)
  .use(Button)
  .use(TableColumn)
  .use(Pagination)
  .use(Tag)
  .use(Switch)
  .use(Tooltip)
  .use(DatePicker);

import {Button,Form,TimePicker,Input,Checkbox,Layout,Menu,Card,Table,Space,Switch,Pagination,Col,Row,DatePicker} from 'ant-design-vue'


const components = [Button,Form,Form.Item,Input.Password,Input,Checkbox,
  Layout,Layout.Footer,Layout.Content,Layout.Header,Layout.Sider,Menu,Menu.Item,Menu.SubMenu,Card,Table,Space,Switch,Pagination,Col,Row,TimePicker,DatePicker.RangePicker]


export default function(app) {
  for(const component of components) {
    app.component(component.name,component)
  }
}
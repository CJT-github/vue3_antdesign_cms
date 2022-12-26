import {Button,Form,Input,Checkbox,Layout,Menu,Card,Table,Space,Switch,Pagination,Col,Row} from 'ant-design-vue'


const components = [Button,Form,Form.Item,Input.Password,Input,Checkbox,
  Layout,Layout.Footer,Layout.Content,Layout.Header,Layout.Sider,Menu,Menu.Item,Menu.SubMenu,Card,Table,Space,Switch,Pagination,Col,Row]


export default function(app) {
  for(const component of components) {
    app.component(component.name,component)
  }
}
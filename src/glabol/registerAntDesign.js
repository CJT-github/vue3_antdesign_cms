import {Button,Form,Input,Checkbox,Layout,Menu,Card,Table} from 'ant-design-vue'


const components = [Button,Form,Form.Item,Input.Password,Input,Checkbox,
  Layout,Layout.Footer,Layout.Content,Layout.Header,Layout.Sider,Menu,Menu.Item,Menu.SubMenu,Card,Table]


export default function(app) {
  for(const component of components) {
    app.component(component.name,component)
  }
}
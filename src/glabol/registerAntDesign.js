import {Button,Form,Input,Checkbox,Layout,Menu} from 'ant-design-vue'


const components = [Button,Form.Item,Input.Password,Input,Checkbox,
  Layout,Layout.Footer,Layout.Content,Layout.Header,Layout.Sider,Menu,Menu.Item]


export default function(app) {
  for(const component of components) {
    app.component(component.name,component)
  }
}
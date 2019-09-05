import React from "react";
import {Menu,Icon} from "antd";

const {SubMenu} = Menu;
class Index extends React.Component{

    handlerClick = (e:any) =>{
        console.log('click',e)
    }
    public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <Menu
                onClick={this.handlerClick}
                style={{width:256}}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <Icon type="mail"/>
                            <span>Navigation one</span>
                        </span>
                    }
                >
                    <Menu.ItemGroup key="g1" title="Item 1">
                        <Menu.Item key='1' >option 1</Menu.Item>
                        <Menu.Item key='2' >option 2</Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup key="g2" title="Item 2">
                        <Menu.Item key='3' >option 3</Menu.Item>
                        <Menu.Item key='4' >option 4</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                            <Icon  type="appstore"/>
                            <span>Navigation Two</span>
                        </span>
                    }
                >
                    <Menu.Item key='5'>Option 5</Menu.Item>
                    <Menu.Item key='6'>Option 6</Menu.Item>
                    <SubMenu
                        key='sub3'
                        title='SubMenu3'
                    >
                        <Menu.Item key='7'>Option 7</Menu.Item>
                        <Menu.Item key='8'>Option 8</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu
                    key='sub4'
                    title={
                        <span >
                            <Icon  type='setting'/>
                            <span>Navigation Three</span>
                        </span>
                    }
                >
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>

            </Menu>
        );
    }
}

export default Index;
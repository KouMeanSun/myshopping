import React from "react";
import PropTypes from 'prop-types';
import {withRouter,Switch,Route } from 'react-router-dom';
import {Layout,Menu,Icon,Breadcrumb} from "antd";
import {connect} from "react-redux";
import _ from 'loadsh';
import './Scaffold.less';

const {SubMenu} = Menu;
const {Header,Sider} = Layout;

const Routes = [];//遍历MENU生成路由
class Scaffold extends React.Component{
    _activeMenu = null;
    _Routes = [];
    static propTypes = {
        menu:PropTypes.array,
        user:PropTypes.node
    };
    constructor(props){
        super(props);
        const menu = props.menu.length
        ?props.menu.filter(menuItem => this.props.location.pathname.startsWith(menuItem.path)):props.initMenu || [];
        const {openKeys ,selectedKeys,breadcrumbRoutes} = this.getMenuState({
            menu
        });
        this.state = {
            openKeys,
            selectedKeys,
            breadcrumbRoutes,
            menu
        };
    }

    /**
     * 生成路由组件
     */
    mapRoutes = (routes,parentPath = '') => {
        routes && routes.forEach((component,path,children) => {
            let currentPath = parentPath === '/' ? path : `${parentPath}${path}`;
            if (component){
                this._Routes.push(
                    <Route
                        key={path}
                        path={currentPath}
                        component={component}
                        exact={true}
                    />
                );
            }
            if (children && children.length > 0) {
                this.mapRoutes(children,currentPath);
            }
        });
    };

    genMenus(menu,contextPath =''){
        if(contextPath[contextPath.length-1] == '/'){
            contextPath = contextPath.slice(0,contextPath.length-1);
        }
        return menu.map(menuItem => {
            let path = menuItem.path;
            if (path){
                if (path[0] !== '/'){
                    path = '/' + path;
                }
                path = contextPath + path;
            }else{
                path = contextPath;
            }
            if (menuItem.children && !menuItem.childrenHidden){
                if (!menuItem.key){
                    return this.genMenus(menuItem.children,path);
                }else if(!menuItem.hidden){
                    return (
                        <SubMenu
                            key = {menuItem.key}
                            title={
                                <span>
                                    {menuItem.icon && (<span className={`iconfont ${menuItem.icon}`} />)}
                                    <span >{menuItem.title}</span>
                                </span>
                            }
                        >
                            {this.genMenus(menuItem.children,path)}
                        </SubMenu>
                    );
                }
            }else {
                if (!menuItem.hidden){
                    return (
                        <Menu.Item key={menuItem.key} >
                            <a href={`#${path}`}>{menuItem.title}</a>
                        </Menu.Item>
                    )
                }
            }
        });
    }

    getMenuState({
        currentMenuItemKey,
        currentPath = this.props.location.pathname,
        menu = this.state.menu
                 }){
        const locateMenuItem = (menu,stack,contextPath = '') => {
            if (contextPath[contextPath.length -1] === '/'){
                contextPath = contextPath.slice(0,contextPath.length-1);
            }
            let currentPathIsPath = (currentPath,path) => {
                if (path.indexOf(':') == -1){
                    return false;
                }else {
                    let position = currentPath.indexOf(
                        path.substr(0,path.indexOf(':') -1)
                    );
                    return position != -1 ? true :false;
                }
            };
            for (let i= 0;i<menu.length;i++){
                const menuItem = menu[i];
                let path = menuItem.path;
                if (path){
                    if (path[0] !== '/'){
                        path = '/' + path;
                    }
                    path = contextPath + path;
                }else {
                    path = contextPath;
                }
                if (
                    menuItem.key === +currentMenuItemKey ||
                    path === currentPath ||
                    (!menuItem.children && currentPath.startsWith(path)) ||
                    currentPathIsPath(currentPath,path)
                ){
                    return stack.push(menuItem);
                }else if(menuItem.children){
                    stack.push(menuItem);
                    const result = locateMenuItem(menuItem.children,stack,path);
                    if (result) return  result;
                    stack.pop();
                }
            }
            console.log('this.state:',this.state);
        };
        const menuStack = [];
        const selectedKeys = [];
        const openKeys = [];
        const breadcrumbRoutes = [];
        let lastBreadcrumbItem;
        locateMenuItem(menu,menuStack);
        let selectedMenu = menuStack.pop();
        if (selectedMenu && selectedMenu.key ){
            selectedKeys.push(selectedMenu.key +'');
            if (menuStack[menuStack.length-1].childrenHidden){
                selectedKeys.push(menuStack[menuStack.length-1].key+'');
            }
            lastBreadcrumbItem = {
                path:selectedMenu.path,
                breadcrumbName:selectedMenu.title
            };
        }
        // while ((selectedMenu == menuStack.shift())){
        //         if ( !selectedMenu.key) continue; ///这个  selectedMenu 为undefined，不知道为啥
        //         openKeys.push(selectedMenu.key + '');
        //         breadcrumbRoutes.push({
        //             path: selectedMenu.path,
        //             breadcrumbName: selectedMenu.title
        //         });
        // }
        lastBreadcrumbItem && breadcrumbRoutes.push(lastBreadcrumbItem);
        return {selectedKeys,breadcrumbRoutes,openKeys};
    }

    onOpenChange = openKeys => {
      this.setState({openKeys});
    };
    onSelect = (item,key,keyPath,selectedKeys) =>{};

    breadcrumbItemRender = route => route.breadcrumbName;

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (
            this.props.location.pathname !== nextProps.location.pathname ||
            this.props.menu !== nextProps.menu
        ){
            const menu = nextProps.menu.length
            ? nextProps.menu.filter(menuItem => nextProps.location.pathname.startsWith(menuItem.pathname))
                : nextProps.initMenu || [];

            const {openKeys,selectedKeys,breadcrumbRoutes } = this.getMenuState({
                currentPath:nextProps.location.pathname,
                menu
            });
            this.setState({menu,openKeys,selectedKeys,breadcrumbRoutes});
        }
    }
    getMenuActive = (arr,path = '') => {
        for (var i=0;i<arr.length;i++){
            let tempPath = path;
            tempPath = arr[i].path == '/' ? '':path + arr[i].path;
            if (
                window.location.hash.substr(1).indexOf(tempPath) != -1 &&
                !arr[i].children
            ){
                this._activeMenu = arr[i];
                break;
            }
            if (arr[i].children){
                this.getMenuActive(arr[i].children,tempPath);
            }
        }
    };
    showBackBtn = () => {
        this._activeMenu = null;
        this.getMenuActive(this.props.menu);
        if (this._activeMenu && !_.isUndefined(this._activeMenu.goBack)){
            if (this._activeMenu.goBack.title){
                return (
                    <span
                        className="breadcrumb-back-btn"
                        onClick = {this.goback.bind(null,this._activeMenu.goBack.url)}
                    >
                        <Icon  type="left"/>
                        {
                            this._activeMenu.goBack.title
                            ? this._activeMenu.goBack.title
                                : '返回'
                        }
                    </span>
                );
            }
        }else {
            return  null;
        }
    };

    goBack = url => {
        if (url){
            this.props.history.push(url);
        }else {
            this.props.history.goBack(url);
        }
    };

    render() {
        console.log('this.props:',this.props);
        this.mapRoutes(this.props.menu.length ? this.props.menu : this.props.initMenu);
        //只显示当前页面title
        // const breadcrumbRoutes = this.state.breadcrumbRoutes.length > 0
        // ? [this.state.breadcrumbRoutes[this.state.breadcrumbRoutes.length-1]]
        //     : [];
        const breadcrumbRoutes = this.state.breadcrumbRoutes;
        const {menu } = this.state;

        //不显示第一层菜单
        // if (this.props.hidenTopMenu){
        //     menu[0] &&
        //         menu[0].children.map(item =>{
        //             delete item['key'];
        //         });
        // }

        return (
            <Layout  className="scaffold" style={{height:'100%'}}>
                <Header  className="scaffold-header">
                    <div className="scaffold-header-logo">{this.props.headerTitle}</div>
                    <div className="scaffold-header-user">
                        {this.props.userInfo && this.props.userInfo}
                    </div>
                </Header>
                {(menu && menu.length && (
                    <Layout >
                        <Sider className="scaffold-sider">
                            <Menu
                                mode="inline"
                                style = {{height:'100%'}}
                                openKeys={this.state.openKeys}
                                selectedKeys={this.state.selectedKeys}
                                onOpenChange={this.onOpenChange}
                                onSelect={this.onSelect}
                            >
                                {this.genMenus(menu)}
                            </Menu>
                        </Sider>
                        <Layout  className="scaffold-body">
                            <div className="scaffold-bread-crumb">
                                <span className="bread-crumb-span">当前位置：</span>
                                <Breadcrumb
                                    routes={breadcrumbRoutes}
                                    itemRender={this.breadcrumbItemRender}
                                    separator={'>>'}
                                />
                                {this.showBackBtn()}
                            </div>
                            <div className="scaffold-content">
                                <Switch>{this._Routes}</Switch>
                            </div>
                        </Layout>
                    </Layout>
                )) ||
                    null
                }
            </Layout>
        );
    }
}

export default withRouter(
    connect(({userInfo = {}}) =>({
        menu:userInfo.menu || []
        }))(Scaffold)
);









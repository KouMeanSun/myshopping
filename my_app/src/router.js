import React from "react";
import MENU from "./MENU";
import {HashRouter,Route,Switch} from "react-router-dom";
import Scaffold  from "./components/Scaffold/Scaffold";


export default () => {
    return (
        <HashRouter >
            <Switch >
                <Route  path="/">
                    <Scaffold
                        headerTitle="爱生活购物app"
                        initMenu={MENU}

                    />
                </Route>
            </Switch>
        </HashRouter>
    );
};



// const Routes = [];//遍历MENU生成的路由
// (function mapRoutes(routes,parentPath = '') {
//     routes.forEach(({component,path,children})=>{
//         let currentPath = parentPath === '/' ? path:`${parentPath}${path}`;
//         if (component){
//             Routes.push(
//               <Route
//                 key={path}
//                 path={currentPath}
//                 component={component}
//                 exact={true}
//               />
//             );
//         }
//         if(children && children.length > 0){
//             mapRoutes(children,currentPath);
//         }
//     })
// })(MENU);
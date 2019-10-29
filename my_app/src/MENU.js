
import {
    ButtonComponent,
    IconComponent,
    TypographyComponent
} from './pages/CommonComponents';


let _id = 0;
const uuid = () => ++_id;

const MENU = [
    {
        path : '/',
        title:'根节点',
        children:[
            {
                key:uuid(),
                icon:'',
                title:'通用',
                path:'/common',
                children:[
                    {
                        key:uuid(),
                        icon:'',
                        title:'Button 按钮',
                        path:'/button',
                        component:ButtonComponent
                    },
                    {
                        key:uuid(),
                        icon:'',
                        title:'Icon 图标',
                        path:'/icon',
                        component:IconComponent
                    },
                    {
                        key:uuid(),
                        icon:'',
                        title:'Typography 排版',
                        path:'/typography',
                        component:TypographyComponent
                    }
                ]
            }
        ]
    }
];

export default MENU;

// ,
// {
//     key:uuid(),
//         icon:'',
//     title:'手机数码',
//     path:'/mobile_digital',
//     component:MobilDigital
// }
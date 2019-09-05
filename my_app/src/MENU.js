import Recommend    from './pages/Recommend';
import MobilDigital from './pages/MobilDigital';

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
                title:'热门推荐',
                path:'/recommend',
                component:Recommend
            },
            {
                key:uuid(),
                icon:'',
                title:'手机数码',
                path:'/mobile_digital',
                component:MobilDigital
            }
        ]
    }
];

export default MENU;
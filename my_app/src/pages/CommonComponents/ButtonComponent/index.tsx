import React from "react";
import {Button, Card} from 'antd';
import './index.less';


class ButtonComponent extends React.Component{


    public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <Card className='button-component-background'>
               <div className='button-component-header'>
                   <h1 className='button-component-header-h1'>Button 按钮</h1>
               </div>
                <section>
                    <p>按钮用于开始一个即使操作。</p>
                    <h2>何时使用</h2>
                    <p>标记了一个（或封装一组）操作命令，响应用户点击行为，出发响应的业务逻辑</p>
                    <h2>代码演示</h2>
                </section>
                <Card>
                    <div>
                        <Button type='primary'>Primary</Button>
                        <Button >Default</Button>
                        <Button type='dashed'>Dashed</Button>
                        <Button type='danger'>Danger</Button>
                        <Button type='link'>Link</Button>
                    </div>
                    <br/>
                    <div>
                        <p>按钮类型</p>
                        <p>按钮有五种类型：主</p>
                    </div>
                </Card>
            </Card>
        );
    }

}

export default ButtonComponent;
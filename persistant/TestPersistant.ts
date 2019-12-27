// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import {persistant, default as PersistantObject, setUniqueId_localStorage} from "./Persistant";
import {myLog} from "../log/MyLog";



class DemoPO extends PersistantObject{
    abc = 'abc';
    num = 123;
    flag = true;
    arr = [123, '666', false];
}


const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @persistant('TEST_XXX')
    static testNum = 100;

    start () {
        /** 初始化唯一id */
        setUniqueId_localStorage('888');

        /** 静态变量持久化 */
        myLog.log("read==>", NewClass.testNum);
        myLog.dividingLine('write TEST_XXX');
        NewClass.testNum = 200;
        myLog.warn('请检查TEST_XXX是否写入本地');


        /** PO对象持久化 */
        const po = new DemoPO('DemoPO');
        myLog.log('po==>', Object.assign({}, po));
        po.reads();
        myLog.dividingLine('reads');
        myLog.log('po==>', Object.assign({}, po));
        po.abc = 'mmm';
        po.num = 789;
        po.flag = false;
        po.writes();
        myLog.dividingLine('writes');
        myLog.log('po==>', Object.assign({}, po));

        /**  */
    }

}

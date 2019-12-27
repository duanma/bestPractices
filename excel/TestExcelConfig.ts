// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import {ExcelConfig} from "./ExcelConfig";
import {myLog} from "../log/MyLog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    start () {
        const tablePath = 'datas/name_full';
        ExcelConfig.loadExcel(tablePath).then(config=>{
            myLog.log(`整个表的数据(${tablePath})==>`, config);
            myLog.log("lv_id=19的数据==>", ExcelConfig.getExcelLine(tablePath, 'lv_id', 19));
        });
    }

}

import {blockTouches, blockTouchEvent} from "./BlockTouches";
import ccclass = cc._decorator.ccclass;
import {myLog} from "../log/MyLog";


@ccclass
export default class NewClass extends cc.Component{
    onLoad(){
        const viewSize = cc.view.getVisibleSize();
        this.node.setContentSize(viewSize.width * 10, viewSize.height * 10);
        this.node.on(cc.Node.EventType.TOUCH_START, blockTouchEvent);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, blockTouchEvent);
        this.node.on(cc.Node.EventType.TOUCH_END, blockTouchEvent);

        this.test();
    }

    @blockTouches
    test(){
        return new Promise(resolve => {
            console.log('请连续点击屏幕，查看日志');
            this.scheduleOnce(()=>{
                myLog.dividingLine();
                resolve();
            }, 3);
        });
    }
}
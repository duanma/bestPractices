
function getNodePath(node:cc.Node) {
    if (!node.parent){
        return `/${node.name}`;
    }else {
        return getNodePath(node.parent) + `/${node.name}`;
    }
}

export function blockTouchEvent(event:cc.Event.EventTouch) {
    console.log(`${event.getType()}=>点击了${getNodePath(event.getCurrentTarget())}`);
    event.stopPropagation();
}


export function addBlockTouches(parent:cc.Node, zIndex:number = cc.macro.MAX_ZINDEX) {
    const node = new cc.Node('blockTouches');
    const viewSize = cc.view.getVisibleSize();
    node.setContentSize(viewSize.width * 10, viewSize.height * 10);
    node.on(cc.Node.EventType.TOUCH_START, blockTouchEvent);
    node.on(cc.Node.EventType.TOUCH_MOVE, blockTouchEvent);
    node.on(cc.Node.EventType.TOUCH_END, blockTouchEvent);
    parent.addChild(node, zIndex);
    return node;
}


export function blockTouches(target: any, prop: string, descriptor: PropertyDescriptor) {
    const oldValue = descriptor.value;
    descriptor.value = function (...args) {
        const node = addBlockTouches(cc.director.getScene());
        const ret = oldValue.apply(this, args);
        const func = function(...results){
            node.destroy();
        };
        if (ret instanceof Promise){
            ret.then(func).catch(func);
        }else {
            func(ret);
        }
        return ret;
    };
    return descriptor;
}




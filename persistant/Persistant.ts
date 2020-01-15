

let _uniqueId:string = null;

export function setUniqueId_localStorage(uniqueId:string) {
    _uniqueId = uniqueId;
}

namespace LocalStorage{

    function get(key:string){
        if (_uniqueId === null){
            throw Error('请先调用setUniqueId_localStorage设置uniqueId');
        }
        return cc.sys.localStorage.getItem(`${_uniqueId}$${key}`);
    }

    function set(key:string, value:any){
        if (_uniqueId === null){
            throw Error('请先调用setUniqueId_localStorage设置uniqueId');
        }
        cc.sys.localStorage.setItem(`${_uniqueId}$${key}`, value);
    }

    export function getNumber(key:string):number|null{
        const val = get(key);
        if (val == undefined || val == null || val == ''){
            return null;
        }
        return parseInt(val);
    }

    export function setNumber(key:string, value:number){
        set(key, value);
    }

    export function getBoolean(key:string):boolean|null{
        const val = getNumber(key);
        if (val == undefined || val == null || val == ''){
            return null;
        }
        return !!val;
    }

    export function setBoolean(key:string, b:boolean){
        let value = 0;
        if (b){
            value = 1;
        }
        set(key, value);
    }


    export function getString(key:string):string|null{
        const val = get(key);
        if (val == undefined || val == null || val == ''){
            return null;
        }
        return val;
    }

    export function setString(key:string, value:string){
        set(key, value);
    }

    export function getObject(key:string):object|null{
        const val = get(key);
        if (val == undefined || val == null || val == ''){
            return null;
        }
        return JSON.parse(val);
    }

    export function setObject(key:string, obj:Object){
        if (typeof obj == "object" && obj != null) {
            set(key, JSON.stringify(obj));
        }
    }

    export function read(key:string, type:string) {
        let t = undefined;
        if (type == 'number'){
            t = getNumber(key);
        }else if (type == 'string'){
            t = getString(key);
        }else if (type == 'boolean'){
            t = getBoolean(key);
        }else if (type == 'object'){
            t = getObject(key);
        }
        return t;
    }

    export function write(key:string, value:any) {
        if (typeof value == 'number'){
            setNumber(key, value);
        }else if (typeof value == 'string'){
            setString(key, value);
        }else if (typeof value == 'boolean'){
            setBoolean(key, value);
        }else if (typeof value == 'object'){
            setObject(key, value);
        }
    }
}

/**
 * 静态类和属性持久化
 * */
export function persistant(key:string) {
    return function <T extends {new(...args: any[]):{}}>(target: T, prop?: string):any {
        if (!CC_EDITOR){
            if (typeof target === "function"){
                /** 初始化静态数据 */
                let lazyInit = false;
                if (prop){
                    let defaultValue = target[prop];
                    Object.defineProperty(target, prop, {
                        // value:target[prop],
                        // writable:true,
                        enumerable:true,
                        configurable:true,
                        get:function () {
                            if (!lazyInit){
                                let data = LocalStorage.read(key, typeof defaultValue);
                                if (data !== undefined && data !== null){
                                    defaultValue = data;
                                }
                                lazyInit = true;
                            }
                            return defaultValue;
                        },
                        set:function (value) {
                            defaultValue = value;
                            LocalStorage.write(key, value);
                        }
                    });
                } else {
                    return <T>(new Proxy(target, {
                        get:function (obj, prop) {
                            if (!lazyInit){
                                const data = LocalStorage.read(`${key}$${prop}`, typeof obj[prop]);
                                if (data !== undefined && data !== null){
                                    obj[prop] = data
                                }
                                lazyInit = true;
                            }
                            return obj[prop];
                        },
                        set:function (obj, prop, value) {
                            obj[prop] = value;
                            if (!lazyInit){
                                lazyInit = true;
                            }
                            LocalStorage.write(`${key}$${prop}`, value);
                            return true;
                        }
                    }));
                }
            }else {
                throw Error(`persistant装饰器仅支持静态类和属性==>target=${(<Function>target).constructor.name} prop=${prop}`);
            }
        }
    }
}



/**
 * 非静态类持久化
 * 持久层对象基类(PO)--实现对象手动持久化
 * 1.只能通过继承PersistantObject来使用cc.sys.localStorage(限制了cc.sys.localStorage的使用)
 * 2.通过Proxy实现值发生变化时自动保存到localStorage
 * 3.下划线打头的成员变量不会保存到localStorage
 *
 */
export default class PersistantObject {

    constructor(storageKey:string){
        this._storageKey = storageKey;
    }

    private readonly _storageKey;

    /**
     * 读取本地数据到内存
     */
    reads(){
        let obj = LocalStorage.read(this._storageKey, 'object');
        if (obj !== undefined && obj !== null){
            Object.keys(obj).forEach(value => {
                if (this.keys().indexOf(value) >= 0){
                    this[value] = obj[value];
                }
            })
        }
        return this;
    }


    /**
     * 写入内存数据到本地
     */
    writes(){
        let obj = {};
        this.keys().forEach(value => obj[value] = this[value]);
        LocalStorage.write(this._storageKey, obj);
        return this;
    }

    private keys():string[]{
        return Object.keys(this).filter(value => this.hasOwnProperty(value) && value[0] != '_');
    }
}

/**
 * 总结：静态属性和静态类使用装饰器方式(自动化)，非静态对象使用继承PersistantObject方式(手动)
 */






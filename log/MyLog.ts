

const c1 = '#E40174';
const c2 = '#E96E3B';
const c3 = '#D45FA4';
const c4 = '#7260D3';
const c5 = '#FFFF00';
const c6 = '#7CD0FF';
const c7 = '#1D0156';
const c8 = '#71C4CC';

export namespace myLog{

    export function log(...args) {
        console.log(...args);
    }

    export function warn(...args) {
        console.warn(...args);
    }

    export function error(...args) {
        console.error(...args);
    }

    export function dividingLine(str:string = '黄金分割线') {
        log(`%c---------------------------------------------${str}-------------------------------------------------`,
            `color:${c3};font-size:10px;background:${c5}`);
    }

    export function todo(str:string = "这里有个功能没实现!!!") {
        log(`%cTODO:%c${str}`, `color:${c4};font-size:20px`, `color:${c4};font-size:15px`);
    }

}
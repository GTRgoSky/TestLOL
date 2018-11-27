const content = 'test';

const contentt = 123;

function test(){
    console.log(666)
}

function cool() {//未在test.d.ts声明所以没法使用
    alert('lalala')
}

export {test, content, contentt, cool}

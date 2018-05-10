//同步：
function f1(parmas){
    console.log(parmas,1)
};

function f2(parmas){
    console.log(parmas,2)
    return parmas
}

f1(f2('input'));

console.log(3);
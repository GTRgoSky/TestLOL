//异步
function f1(parmas,cb){
    console.log(parmas,1)
    cb(parmas);
};

function f2(parmas,cb){
    console.log(parmas,2)
    cb(parmas);
}

f2('input',function(output2){
    f1(output2,function(output1){
        console.log(output1,'finish');
    })
})

console.log(3)
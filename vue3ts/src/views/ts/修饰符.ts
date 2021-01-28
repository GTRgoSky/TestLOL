// 参数装饰器
// function Log(target: Function, key: string, parameterIndex: number) {
//     console.log(target, key, parameterIndex);
//     let functionLogged = key || target.prototype.constructor.name;
//     console.log(`The parameter in position ${parameterIndex} at ${functionLogged} has
//    been decorated`);
// }

// class Greeter {
//     constructor() {
//     }

//     test(@Log phrase: string) {
//         console.log(phrase);
//     }
// }


// var a = new Greeter();

// a.test('lala');


// 方法装饰器

function LogOutput(target: Record<string, any>, key: string, descriptor: any) {
    const originalMethod = descriptor.value;
    console.log(target, key, descriptor);
    const newMethod = function (this: any, ...args: any[]): any {
        console.log(this);
        const result: any = originalMethod.apply(this, args);
        if (!this.loggedOutput) {
            this.loggedOutput = new Array<any>();
        }
        this.loggedOutput.push({
            method: key,
            parameters: args,
            output: result,
            timestamp: new Date()
        });
        return result;
    };
    descriptor.value = newMethod;
}

class Greeter {
    loggedOutput: any

    @LogOutput
    double(num: number): number {
        return num * 2;
    }
}

const calc = new Greeter();
calc.double(11);
// console ouput: [{method: "double", output: 22, ...}]
console.log(calc.loggedOutput); 
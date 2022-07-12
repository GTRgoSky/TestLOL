// // 泛型继承
// interface Girl {
//     name: string;
// }

// // 这句代码的意思是泛型里必须有一个name属性，因为它继承了Girl接口。
// class SelectGirl<T extends Girl> {
//     constructor(private girls: T[]) { }
//     getGirl(index: number): string {
//         return this.girls[index].name;
//     }
// }

// const selectGirl = new SelectGirl([
//     { name: "大脚" },
//     { name: "刘英" },
//     { name: "晓红" },
// ]);
// console.log(selectGirl.getGirl(1));

// 泛型约束

// 进行了类型约束，泛型类型只能是number和string
class SelectGirl<T extends number | string> {
    constructor(private girls: T[]) { }
    getGirl(index: number): T {
        return this.girls[index];
    }
}

const selectGirl = new SelectGirl<string>(["大脚", "刘英", "晓红"]);
console.log(selectGirl.getGirl(1));
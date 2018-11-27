declare module "*.js" {
    //*.js的声明文件,js中的test、content、contentt可以被使用
    //未声明的变量不能被使用
    export function test(): void;
    export const content: string;
    export const contentt: number;
}

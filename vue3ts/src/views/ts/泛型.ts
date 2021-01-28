/**
 * 1、infer R
 * 对比 (s: string) => string 和 (str: infer R) => string
 * 如果是同一个类型 返回 R的类型 也就是 string
 * 最终 C 就是 R的类型
 */
type A<T> = T extends (str: infer R) => string ? R : any;

type B = string;
type D = (s: string) => B;

type C = A<D>;


function CC(): C {
    return '231'
}
// 深拷贝，如果直接赋值，会导致record2 和 this.record 引用的是同一对象
// 泛型：定义一个 X 类型，传进来时 X 类型，传出去也是 X 类型
function clone<X> (data: X): X{
    return JSON.parse(JSON.stringify(data))
}

export default clone
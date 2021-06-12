//定义一个 RecordItem对象类型
type RecordItem = {
    tags: string[]
    notes: string
    type: string
    amount: number
    createAt?: Date    // 变量+? 可以为undefined
}
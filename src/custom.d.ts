//定义一个 RecordItem对象类型
type RecordItem = {
    tag: Tag
    notes: string
    type: moneyType
    amount: number
    createAt?: string    // 变量+? 可以为undefined
}

type Tag = {
    id: string,
    svg?:string,
    name: string,
    type?: moneyType
}

type moneyType = 'income' | 'expense'


type RootState = {
    recordList: RecordItem[],
    tagList: Tag[],
    createTagError: Error|null
}

type TagListModel = {
    data: Tag[]
    fetch: () => Tag[]
    create: (name: string) => 'success' | 'duplicated'
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
    remove: (id: string) => boolean
    save: () => void
}

interface Window{

}
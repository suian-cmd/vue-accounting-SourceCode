import recordStore from '@/store/recordStore.ts'
import tagStore from '@/store/tagStore.ts'

const store = {
    ...recordStore,
    ...tagStore
}

export default store
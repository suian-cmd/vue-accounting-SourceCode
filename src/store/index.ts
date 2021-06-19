import Vue from 'vue'
import Vuex from 'vuex'
import router from "@/router";
import clone from "@/lib/clone";
import createId from "@/lib/createId";
import dayjs from "dayjs";
import defaultTagList from "@/constants/defaultTagList";

Vue.use(Vuex)


const store =  new Vuex.Store({
  state : {
    recordList: [],
    tagList: [],
    createTagError: null
  } as RootState,
  mutations: {
    fetchRecords(state){
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[]
    },
    createRecord(state, record: RecordItem){
      const record2: RecordItem = clone(record)
      // record2.createAt = dayjs(record2.createAt).format('YYYY-MM-DD') || new Date().toISOString()
      state.recordList.push(record2)
      store.commit('saveRecords')
    },
    saveRecords(state){
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
    },

    fetchTags(state){
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]')
      if(!state.tagList || state.tagList.length === 0){
        store.commit('setDefault')
      }
    },
    setDefault(){
      for(let i = 0; i < defaultTagList.length; i++){
        store.commit('createTag', defaultTagList[i])
      }
    },
    createTag(state, newTag: Tag){
      const id = createId().toString()
      state.tagList.push({id: id, name: newTag.name, type: newTag.type, svg: newTag.svg })
      store.commit('saveTags')

    },
    saveTags(state){
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList))
    },
    deleteTag(state,tag:Tag){
      state.tagList = JSON.parse(window.localStorage.getItem('tagList')||'[]')
      for(let i = 0;i<state.tagList.length;i++){
        if(state.tagList[i].name === tag.name){
          state.tagList.splice(i,1)
        }
      }
      store.commit('saveTags')
    }

  },
  actions: {
  },
  modules: {
  }
})

export default store

import storage from 'good-storage'
const SEARCH_KEY = '__search__'
const MAX_LENGTH =15
const PLAY_KEY = '__paly__'
const MAX_PLAY_LENGTH = 100

function insertArray(arr,val,MAX,compare){
    //判断是否以前有搜索过,compare在外部编写
    //indIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
    let  index = arr.findIndex(compare)
    if(index === 0 ){
        return 
    }
    if(index > 0 ){
        arr.splice(index,1)
        
    }  
    arr.unshift(val)
    
    if(arr.length > MAX && MAX ){
        arr.pop()
    }

}

function deleteArray(arr,compare){
    let index = arr.findIndex(compare)
    if(index > -1 ){
        arr.splice(index,1)
    }
}

export function loadSearch (){
    return storage.get(SEARCH_KEY,[])
}

export function saveSearch(query){
    //如果已有历史就get缓存中的数组，没有就空数组
    let searchs = storage.get(SEARCH_KEY,[])
    insertArray(searchs,query,MAX_LENGTH,(item) => {
        return item ===query
    })
    storage.set(SEARCH_KEY,searchs)
    console.log(searchs)
    return searchs
    
}

export function deleteSearch(query){
    let searchs = storage.get(SEARCH_KEY,[])
    deleteArray(searchs,(item) => {
        console.log(query)
        return item ===  query
    }) 
    storage.set(SEARCH_KEY,searchs)
    return searchs
}

export function clearSearch(){
    storage.remove(SEARCH_KEY)
    // localStorage.clear()
    return []
}


export function savePlay(query){
     //如果已有历史就get缓存中的数组，没有就空数组
     let plays = storage.get(PLAY_KEY,[])
     console.log(query)
     insertArray(plays,query,MAX_PLAY_LENGTH,(item) => {
         return item.id === query.id
     })
     storage.set(PLAY_KEY,plays)
     return plays
}

export function loadPlay(){
    return storage.get(PLAY_KEY,[])
}
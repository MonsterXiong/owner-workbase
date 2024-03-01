export function listToTree(list,{idKey='id',pidKey='parentId',childKey='children'} = {}){
  if(!Array.isArray(list)){
    return []
  }
  const idMap = {}
  const tree = []
  list.forEach(item=>{
    idMap[item[idKey]] = item
  })

  list.forEach(item=>{
    const parent = idMap[item[pidKey]]
    if(parent){
      ;(parent[childKey] || (parent[childKey] = [])).push(item)
    }else{
      tree.push(item)
    }
  })

  return tree
}

const uniqueCode = {
  key:'uniqueCode',
  prop:'',
  label:'唯一标识'
}
const parentCode = {
  key:'parentCode',
  prop:'',
  label:'父级标识'
}
const displayName = {
  key:'displayName',
  prop:'',
  label:'展示名称'
}
const relCode = {
  key:'relCode',
  prop:'',
  label:'关联字段'
}
const relVerticalCode = {
  key:'relVerticalCode',
  prop:'',
  label:'关联纵向字段'
}
const relHorizontalCode = {
  key:'relHorizontalCode',
  prop:'',
  label:'关联横向字段'
}

export const FIELD_COMPONENT_TYPE = {
  TREE:'tree',
  LIST:'list',
  MATRIX:'matrix'
}

export const FIELD_COMPONENT_INFO = {
  [FIELD_COMPONENT_TYPE.TREE]:[uniqueCode,displayName,parentCode],
  [FIELD_COMPONENT_TYPE.LIST]:[uniqueCode,displayName],
  [FIELD_COMPONENT_TYPE.MATRIX]:[uniqueCode,relCode,relVerticalCode,relHorizontalCode]
}

export function getSpecialFieldInfo(list){
  const filedInfo = {}
  list.forEach(item=>{
    const { Field,Key} = item
    const isPrimaryKey = Key == 'PRI'
    const isIncludeName = Field.endsWith('name')
    const parentCode = Field.endsWith('parent_id')
    const relCode = (Field.indexOf('rel')>=0 && !isPrimaryKey) || Field.endsWith('value')
    if(isPrimaryKey){
      filedInfo['uniqueCode'] = Field
    }
    if(isIncludeName){
      filedInfo['displayName'] = Field
    }
    if(parentCode){
      filedInfo['parentCode'] = Field
    }
    if(relCode){
      filedInfo['relCode'] = Field
    }
  })
  return filedInfo
}

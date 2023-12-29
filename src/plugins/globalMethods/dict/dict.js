
class EnumData {
  constructor(enumData) {
    this.allEnum = enumData
  }

  getAllEnum(){
    return this.allEnum
  }

  getEnumByCode(menuCode) {
    if (this.allEnum && this.allEnum[menuCode]) {
      return this.allEnum[menuCode].sort((a, b) => a.sort - b.sort)
    }
    return []
  }

  getEnumMeaning(menuCode, key){
    const list = this.getEnumByCode(menuCode)
    if (Array.isArray(list)) {
      const item = list?.find((item) => item.code == key)
      return item ? item.name : ''
    }
    return ''
  }
}

export default EnumData

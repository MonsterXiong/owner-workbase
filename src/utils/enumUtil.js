class EnumFactory {
  constructor(enums) {
    this.enums = enums
    this.labels = enums.map((item) => item.label)
    this.values = enums.map((item) => item.value)
  }
  getValueByLabel(label) {
    if (!label) {
      return ''
    }
    const index = this.labels.indexOf(label)
    return index < 0 ? '' : this.values[index]
  }
  getLabelByValue(value) {
    if (!value) {
      return ''
    }
    const index = this.values.indexOf(value)
    return index < 0 ? '' : this.labels[index]
  }
  getItemByValueOrLabel(valueOrLabel) {
    let index = this.values.indexOf(valueOrLabel)
    if (index < 0) {
      index = this.labels.indexOf(valueOrLabel)
    }
    return this.enums[index]
  }
}

export function getOption(list, { labelKey = 'name', valueKey = 'id' }) {
  return list.map((item) => {
    return {
      label: item[labelKey],
      value: item[valueKey],
    }
  })
}

export function genEnumByList(list, config = {}) {
  return new EnumFactory(getOption(list, config))
}

export function genEnumByOption(list) {
  return new EnumFactory(list)
}

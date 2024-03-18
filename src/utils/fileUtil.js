export function downloadFile(file) {
  const href = URL.createObjectURL(file)
  const box = document.createElement('a')
  box.href = href
  box.click()
}

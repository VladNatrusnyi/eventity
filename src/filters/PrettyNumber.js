export default function formatNumber (value) {
  return value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}

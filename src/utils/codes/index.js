import codes from './codes.json'

export default function(code) {
  if (typeof code === 'number' || typeof code === 'string') {
    code = String(code)
    if (!codes[code]) return false
    return codes[code]
  }

  return false
}

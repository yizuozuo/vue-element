import Cache from '../cache'
const FitStepKey = 'fit-step'
const FitBatchKey = 'fit-batch'
const SkinCodeKey = 'fit-skin-code'

export function getStep() {
  return Cache.get(FitStepKey) || 0
}

export function setStep(t = 0) {
  return Cache.set(FitStepKey, t)
}

export function getBatchNo() {
  return Cache.get(FitBatchKey) || ''
}

export function setBatchNo(t = '') {
  return Cache.set(FitBatchKey, t)
}

export function getSkinCode() {
  return Cache.get(SkinCodeKey) || ''
}

export function setSkinCode(t = '') {
  return Cache.set(SkinCodeKey, t)
}
export function debounce(fn: () => void, ms: number) {
  let timeout: any
  return function () {
    //@ts-ignore
    const fnCall = () => {fn.apply(this, arguments)}
    clearTimeout(timeout)
    timeout = setTimeout(fnCall, ms)
  }
}
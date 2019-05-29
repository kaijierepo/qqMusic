export function shuffle(arr) {
    let _arr = arr.slice()
    for(let i=0, len = _arr.length; i < len; i++) {
        let index = parseInt(Math.random() * (len - 1));
        let tempValue = _arr[i];
        _arr[i] = _arr[index];
        _arr[index] = tempValue;
    }
    return _arr;
}

export function debounce(func, delay) {
    let timer
  
    return function (...arg) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        func.apply(this, arg)
      }, delay)
    }
  }
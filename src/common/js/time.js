export function time(val) {
        val = val | 0
        let minute = pad((val/60) | 0)
        let second = pad(val % 60)
        return `${minute}:${second}`
}

function pad(num,n=2){
    let len = num.toString().length
    while(len < n){
        num = '0'+num
        len++
    }
    return num
}
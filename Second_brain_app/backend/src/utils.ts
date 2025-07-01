export function randomHash(len: number){
    const options = "qwertyuiopasdfghjklzxcvbnm1234567890"
    let ans = ""
    const num = options.length
    for(let i=0; i<len; i++){
        ans += options[Math.floor(Math.random()*num)]
    }
    return ans;
}
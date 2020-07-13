export function handleDate(date){
    const localDate = String(date.getFullYear()) +'-'+ String(date.getMonth()+1) +'-'+ 
                        String(date.getDate()) +' '+ date.toLocaleTimeString().slice(2)
    return localDate
}
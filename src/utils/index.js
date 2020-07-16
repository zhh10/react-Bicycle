export function handleDate(date){
    const localDate = String(date.getFullYear()) +'-'+ String(date.getMonth()+1) +'-'+ 
                        String(date.getDate()) +' '+ date.toLocaleTimeString().slice(2)
    return localDate
}

export function pagination(data,callback){
    return{
        onChange:(page)=>{
            callback(page)
        },
        current:data.page,
        pageSize:data.page_size,
        total:data.total_count,
        showTotal:()=>{
            return `共${data.page}/${data.page_size}页`
        },
        showQuickJumper:true
    }
}
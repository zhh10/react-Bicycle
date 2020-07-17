export const actionTypes = {
    switchMenu:Symbol("switchMenu")
}

export  function switchMenu(payload){
    return {
        type:actionTypes.switchMenu,
        payload:payload,
    }
}

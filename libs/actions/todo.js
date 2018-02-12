export const SET_TODOLIST = 'SET_TODOLIST'

export const setTodoList = (textList) => ({
        type: SET_TODOLIST,
        payload: textList
})

export const DEL_TODULIST = 'DEL_TODULIST';
export const delTodoList = (id) => ({
    type: DEL_TODULIST,
    payload: id
})
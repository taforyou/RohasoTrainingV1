import {
    SET_TODOLIST,
    DEL_TODULIST
} from '../actions/todo'

const initialState = {
    todoList: ['xxx']
}

export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_TODOLIST:
            return {
                ...state,
                todoList: state.todoList.concat([payload]) 
            }
        case DEL_TODULIST:
            return {
                todoList:[
                    ...state.todoList.slice(0, payload),
                    ...state.todoList.slice(payload + 1)
                ]
            }
        default:
            return state
    }
}
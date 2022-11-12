import { ADD,DELETE,UPDATE } from "./types";

export const reducer = (state,action) => {
    switch(action.type) {
        case ADD:
            return [...state, action.payload]

        case UPDATE:{
            const updatedTodo=action.payload;
            return state.map((todo) => todo.id === updatedTodo.id ? updatedTodo : todo);
                
        }
            
        case DELETE:
            return state.filter((todo) => todo.id !==action.payload)
            
        default:
             return state
    }
   

}
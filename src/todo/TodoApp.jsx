import { useReducer,useState
 } from "react";
import { reducer } from "./reducer";
import { ADD,DELETE,UPDATE } from "./types";

const initialTodos = [
  {id: 1,
  title: '#1 todo'},
  {id: 2,
    title: '#2 todo'}
]

const TodoApp = () => {
const [state,dispatch] = useReducer(reducer,initialTodos);

const [text, setText] = useState('');
  
const handleDelete = (id) => {
    dispatch({
      type:DELETE,
      payload: id
    })
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const newTodo={id: Date.now().toString(), title: text}
    dispatch({
      type: ADD,
      payload: newTodo
    })
    setText('')
  }

  const handleUpdate = (todo) =>{
    //e.preventDefault();
    const updatedTodo={...todo,title:text}
    dispatch({
      type: UPDATE,
      payload: updatedTodo
    })
    setText('')
  }

    
    
  return (
    <div>
        <h2>Todos</h2>
        <ul>
          {state.map((todo) => (
            <li key={todo.id}>{todo.title}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
            <button onClick={() => handleUpdate(todo)}>Update</button>
            </li>
            
          ))}
        </ul>

        <form  onSubmit={handleAdd}>
 <input type="text"
         className="addText"
         value={text}
         onChange={(e) => setText(e.target.value)}
         placeholder='Add a new Todo' />

         <button type="submit">Create new Todo</button>

        </form>
       
    </div>
  )
}

export  {TodoApp}
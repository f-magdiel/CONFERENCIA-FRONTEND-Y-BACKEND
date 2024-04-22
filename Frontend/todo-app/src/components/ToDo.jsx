import { useState } from "react"
import './AppTodo.css';
import axios from 'axios';

export default function Todo({item,onUpdate,onDelete}){
    //props son propiedades de un componente

    const [isEdit,setEdit] = useState(false);

    const handleDelete = (id) => {
        e.preventDefault();
        print("id: "+id)
        
    }

    

    //componentes
    function FormEdit(){

        const [newvalor,setNewValor] = useState(item.titulo);

        function handleSubmit(e){
            e.preventDefault();
        }

        function handleChange(e){
            const valor = e.target.value;
            setNewValor(valor);
        }

        function handleClickUpdate(e){
            onUpdate(item.id,newvalor);
            setEdit(false);
        }

        return(
            <form className="todoUpdateForm" onSubmit={handleSubmit}>
                <input 
                type="text" 
                className="todoInput" 
                onChange={handleChange} 
                value={newvalor}/>
                <button className="buttonUpdate" onClick={handleClickUpdate}>Actualizar</button>
            </form>
        )
    }

    function TodoElement(){
        return(
        <div  className="todoInfo">
        <span className="todoTitle">{item.titulo}</span>
        <button className="button" onClick={()=>setEdit(true)}>Editar</button>
        <button className="buttonDelete" onClick={(e)=>onDelete(item.id)}>Eliminar</button>
        </div>
        )
    }

    return (
        <div className="todo">
            {isEdit?<FormEdit/>:<TodoElement/>}
        </div>
        
    )


}
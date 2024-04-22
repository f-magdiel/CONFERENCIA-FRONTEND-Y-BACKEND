
import {useState, useEffect} from "react";
import './AppTodo.css';
import Todo from './ToDo'
import axios from 'axios';

export default function TodoApp(){
    //hock es una funcion que permite actualizar info de las variables
    const [titulo,setTitulo]= useState("");
    const [lista,setListas]=useState([]);


    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/tasks')
        .then(response=>{
            console.log(response.data);
            setListas(response.data.reverse());
        })
        .catch(error=>{
            console.log(error);
        }
        )
    },[])

    /*function handleClick(e){
        e.preventDefault();
        setTitulo("Hello")
    }*/

    function handleChange(event){
        const valor = event.target.value;
        setTitulo(valor)
    }

    //setListas([...lista,{ ...newTodo,id:id}])

    function handleSubmit(e){
        e.preventDefault();
        
        const newTodo = {
            titulo: titulo,
            completed:0
        }
        axios.post('http://127.0.0.1:5000/tasks',newTodo)
        .then(response=>{
            console.log(response.data);
            //alert("Lista creada con exito");
            //Agrgar la lista al inicio
            const temp = [...lista];
            temp.unshift(newTodo);
            setListas(temp);


        })
        .catch(error=>{
            console.log(error);
        })

        //forma 1 de insertar en la lista
        //setListas(...lista,newTodo);

        //forma 2
        //const temp = [...lista];
        //temp.unshift(newTodo); // se agrega al inicio
        //setListas(temp);
        setTitulo("")
        
        
    }

    function handleUpdate(id,valor){
        console.log("id: "+id+" valor: "+valor);
        axios.put(`http://127.0.0.1:5000/tasks/${id}`,{
            "titulo":valor
        })
        .then(response=>{
            console.log(response.data);
            alert("Tarea actualizada");
        })
        .catch(error=>{
            console.log(error);
        })
        
        const temp = [...lista];
        const item = temp.find(item => item.id === id);
        item.titulo = valor;
        setListas(temp);
    }

    function handleDelete(id){
        axios.delete('http://127.0.0.1:5000/tasks/'+id)
        .then(response=>{
            console.log(response.data);
            alert("Tarea eliminada");
            onDelete(id);
        })
        .catch(error=>{
            console.log(error);
        })
        //Actualizar la lista
        const temp = lista.filter(item => item.id !== id);
        setListas(temp);
        
    }

    return(
        <div className="todoContainer"> 
        <form className="todoForm" onSubmit={handleSubmit}>
            <input onChange={handleChange} className="todoInput" value={titulo}/>
            <input onClick={handleSubmit} type="submit" value="Crear lista" className="todoButton"/>
            
        </form>

        <div className="todosContainer">
            {lista.map((item) => (
                    //<div key={item.id}>{item.titulo}</div>
                    <Todo key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete}/>
            ))}
        </div>
        </div>
    )
}
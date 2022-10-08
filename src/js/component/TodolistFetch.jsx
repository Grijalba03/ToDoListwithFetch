import React, { useState, useEffect } from "react";

export const TodolistFetch = () => {
  const [listTodos, setListTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [username, setUsername] = useState("");

  const BASE_URL = "https://assets.breatheco.de/apis/fake/todos/";

  const crearUsername = async (e) => { 
    // // e.preventDefault() 
    // let data = FormData(e.target.value)
    // let username= data.get('username')
    // console.log("la variable username es: ", username)
    
    let URI = `${BASE_URL}user/${username}`;
    console.log(" URI ", URI);
    try {
      let respuesta = await fetch(URI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([]),
      });
      console.log(respuesta);
      if (respuesta.ok) {
        alert("username creado correctamente");
        return;
      } else {
        alert("Error al crear username, o el username ya existe");
        
      }
      let respuestaJSON = await respuesta.json();
      console.log(respuestaJSON)

    } catch {
      (e) => console.log(e);
    }
  };  

  const fixname = (arrAux) => { 
     
    console.log(arrAux);
  }

  const traerListaTareas = async() => {
    let URI = `${BASE_URL}user/${username}`;
    try{
      let respuesta = await fetch(URI)
      if(respuesta.ok){
        let respuestaJSON = await respuesta.json()
        console.log(respuestaJSON)
        console.log(listTodos)
        setListTodos(respuestaJSON)
        console.log(listTodos)
      }else{
        console.log("respuesta fallida")
        setListTodos([])
      }
    }
    catch{err=>console.log(err)}
  }

  useEffect(()=>{
    traerListaTareas()
  },[username])

 

  const deleteTodo = (indiceTarea) => {
    let aux = listTodos.filter((item, index) => index != indiceTarea)
    editarTareas(aux)
  };

const editarTareas = (todos) => { 

  fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
    method: "PUT",
    body: JSON.stringify(todos),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      traerListaTareas();
    })
    .catch((error) => {
      console.log(error);
    });
}

  return (
    <div className="card">
      <input
        type="text"
        placeholder="Username"
        onKeyUp={(e) => {
          if (e.keyCode == "13") {
            setUsername(e.target.value)
          }
        }}
      />
      <button type="button" onClick={() => crearUsername()}>
        Crear username
      </button>
      {/* <button type="button" onClick={()=>traerListaTareas()}>Traer las tareas</button> */}
      <input
        type="text"
        placeholder="escribe una tarea nueva"
        onKeyUp={(e) => {
          if (e.keyCode == "13") {
            let arrAux = listTodos.slice();
            arrAux.push({label:e.target.value, done: false});
            editarTareas(arrAux);
            console.log(" arrAux ", arrAux);
            fixname (arrAux)
            e.target.value = "";
             
          }
        }}
      />
      <ul>
        {listTodos.length>0 && listTodos && listTodos!=undefined? listTodos.map((item, indice) => {
          return (
            <li
              className="list-group-item d-flex justify-content-between"
              key={indice}
            >
              {item.label}
              <span>{JSON.stringify(item.done)}</span>
              <button
                type="button"
                className="btn btn-light"
                onClick={(e) => {
                  deleteTodo(indice);
                }}
              >
                Eliminar
              </button>
            </li>
          );
        }):<>No Hay tareas</>}
      </ul>
    </div>
  );
};
import './App.css'
import Newitem from './Components/Newitem/Newitem';
import Todolist from './Components/Todolist/Todolist';
import {useEffect, useState} from "react"
import{nanoid} from 'nanoid'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const App=()=> {
  const [list,setList]=useState([])
  const[editState,setEditState]=useState({})

  useEffect(()=>{
    fetch('http://localhost:3000/api/v1/list').then((res)=>{
       res.json().then((json)=>{
        setList(json)
       })
    }).catch(()=>{
      console.log('Network error!')
    })
  },[])


    
    const triggerEdit=(item)=>{
          setEditState(item)
    }
  
    const editItem=(updatedItem)=>{
      const updatedList=  list.map((item)=>item.id===updatedItem.id ?updatedItem:item)
           setList([...updatedList])
       }
    

       const addItem = (item) => {
        item.id = nanoid();
        fetch("http://localhost:3000/api/v1/list", {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }).then(() => {
          setList((prev) => [item, ...prev]);
          toast.success("Added successfully!");
        });
      };

      const deleteItem = (id) => {
        fetch(`http://localhost:3000/api/v1/list/${id}` ,{
      method  :'DELETE',
      headers :{
        'Accept' : 'application/json ,text/plain ,*/*',
        'Content-Type': 'application/json'
      },
    }).then((res)=>{
      res.json().then((json)=>{
        console.log(json)
        const filteredList = list.filter((item) => item.id !== id)
        setList([...filteredList])
        toast.error("Deleted Successfully");
      })
    })
  }
      

   
    return (
      <div className='app'>
      <h1 className='title'>
        Todo List
      </h1>
      
         <Newitem addItem={addItem} editState={editState} editItem={editItem}/>
         <Todolist list={list} deleteItem={deleteItem} triggerEdit={triggerEdit}/>
         </div>
    )
};
export default App;
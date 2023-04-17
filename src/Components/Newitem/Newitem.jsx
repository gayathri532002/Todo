import './Newitem.css'
import { useEffect, useState } from 'react' ;

const PRIORITY =['low','medium','high']

const Newitem=(props)=>{
    const {addItem,editState,editItem}=props
    
        const [title,setTitle]=useState('')
    const [priority,setPriority]=useState('low')
    const isEdit=Boolean(editState.id)

    useEffect(()=>{
        if(editState.id){
            setTitle(editState.title)
            setPriority(editState.priority)
        }
    },[editState])

    const handleInputChange=(e)=>{
        setTitle(e.target.value)
    }

const handleSave =() =>{
    if(!title)
    {
        return
    }
    const obj={
        
        title,
        priority
    }

    if(isEdit){
        obj.id = editState.id
        editItem(obj)
    }else{

        addItem(obj)
    }
    

    setTitle('')
    setPriority('low')
}
const clearState =()=>{
    setTitle('')
    setPriority('low')
}
    
    return(
        <div className="new-item-card">
            <div className="checkbox"/>
            
            <div className='form-container'>
                <input placeholder='Type here...' value={title} onChange={handleInputChange}/>
                {title &&(<div>
                <div className='badge-container'>

                    {PRIORITY.map((p)=> (
                    <div
                    key={p}
                     className={`p-badge ${p=== priority && 'selected'}`}
                     onClick={()=>setPriority(p)}
                     >
                        {p}
                        </div>
                    ))}
                </div>
                
                <div className='btn-container'>
                    
                    <button className='primary' onClick={handleSave}>Save</button>
                    <button onClick={clearState}>Clear</button>
                </div>

                </div>
                )}
            </div>
        </div>
        
    
    )

    }
    export default Newitem
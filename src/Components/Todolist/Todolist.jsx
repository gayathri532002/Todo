import Todolistitem from "./Todolisitem/Todolistitem"

const Todolist = (props)=>{
    const {list, deleteItem,triggerEdit} =props

if(list.length <=0){
    return(
        <center>No items to display!</center>
    ) 
}
    return(
        <>
          {list.map((item,index)=>(
          <Todolistitem 
          key={index}
          item={item}
          index={index}
          onDelete={deleteItem}
          onEdit={triggerEdit}/>
          ))}
        </>
        
    )
}
export default Todolist;
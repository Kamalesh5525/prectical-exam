import { useState } from 'react'
import './crud.css'

//  import 'bootstrap/dist/css/bootstrap.min.css'





  function App() {
  
    const [name,Setname] = useState("");
    const [description,Setdescription] = useState("");
    const [editid,SetEditId] = useState("")
  
    const getUser = () => {
      let data = JSON.parse(localStorage.getItem('user'));
      if(data){
        return data;
      }else{
        return []
      }
    }
  
    const [record,setRecord] = useState(getUser());
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if(!name || !description){
        alert("All field is required");
        return false;
      }
     
      let obj = {
        id : Math.floor(Math.random()*10000),name,description
      }
      if(editid){
        let up = record.map((val) =>{
          if(val.id == editid){
            val.name = name,
            val.description = description
          }
          return val;
        })
        localStorage.setItem('user',JSON.stringify(up));
        alert("Record update")
        setRecord(up)
        SetEditId("")
      }else{
        let newrecord = [...record, obj];
        localStorage.setItem("user",JSON.stringify(newrecord));
        setRecord(newrecord);
        alert("Record Add");
      }
      Setname("");
      Setdescription("");
    }
  
    const deleteUser = (id) =>{
      let deleter = record.filter(val => val.id !=id);
      localStorage.setItem('user',JSON.stringify(deleter))
      alert("Record Delete");
      setRecord(deleter);
    }
  
    const editUser = (id,name,description) =>{
      Setname(name)
      Setdescription(description);
      SetEditId(id)
    }
  
    return (
      <>
         <div align="center" className='hi'>
            <h1>My Todos</h1>
            <form onSubmit={handleSubmit}>
              Name :-
              <input type="text" onChange={(e) => Setname(e.target.value)} value={name || ""} />
              description :-
              <input type="text" onChange={(e) => Setdescription(e.target.value)} value={description || ""} />
              {editid ? <input type="submit" value="Edit"/> : <input type="submit"/>}
            </form>
          </div> 
          <br /><br />
          <div align="center" >
            <table border={1}>
              <thead>
                <tr >
                  <td>Id</td>
                  <td>Name</td>
                  <td> description</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
              {
                record.map((val) =>{
                  const {id, name, description} = val;
                  return(
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{name}</td>
                      <td>{description}</td>
                      <td>
                        <button1 onClick={()=> deleteUser(id)}>Delete</button1>
                      </td>
                      <td>
                        <button onClick={() => editUser(id, name, description) } > Edit</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
            </table>
           
          </div>
      </>
    )
  }
  
  export default App
import React,{useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {getNameVideogame} from '../actions/index'




const SerchBar = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    const handleInputChange = (e)=>{
        e.preventDefault()
        setName(e.target.value) 
    } 
    const handleClick= (e)=>{
        e.preventDefault()
        dispatch(getNameVideogame(name))
        setName("")
      }    
  return (
    <div>
       <input
        placeholder='Buscar....'
        value = {name}
        type="text"
        onChange={e=> handleInputChange(e)}
        />
        <button onClick={e=> handleClick(e)}> Buscar</button>
        
    </div>
  )
}


export default SerchBar
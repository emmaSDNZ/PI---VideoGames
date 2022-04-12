import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getGender, postVideogame} from '../actions/index'
import {useNavigate} from 'react-router-dom'
import css from '../Css/forms.module.css';

function validacionError(input){
  let error = {};
  if(!input.name){ 
    error.name= "ingrese un Nombre"}
  if(!input.background_image){  
    error.background_image ="se require un link a una imagen";}
  if(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[1-9]|2[1-9])$/.test(!input.released)){
    error.released="dd/mm/aaaa"
  }
  if(!input.released){
    error.released="complete date"
  }
  if(!input.rating || input.rating > 5 || input.rating < 0) {
    error.rating = "Rating valid 0 - 5"
  }
  if(!input.description_raw){
    error.description_raw="se requiere una description";
  } 
  
  return error
}

const Forms = () => {
  const plataformas =["PC","PlayStation 5", "PlayStation 4","Xbox One","Xbox Series S/X", "Nintendo Switch",
  "iOS", "Android", "Nintendo 3DS", "Nintendo DS", "Nintendo DSi", "macOS",  "Linux", "Xbox 360",
  "Xbox","PlayStation 3","PlayStation 2","PlayStation","PS Vita", "PSP","Wii U","Wii", "GameCube", "Nintendo 64",
  "Game Boy Advance","Game Boy Color","Game Boy","SNES",  "NES", "Classic Macintosh", "Apple II","Commodore / Amiga",
  "Atari 7800","Atari 5200", "Atari 2600","Atari Flashback", "Atari 8-bit","Atari ST",  "Atari Lynx","Atari XEGS",
   "Genesis","SEGA Saturn","SEGA CD","SEGA 32X","SEGA Master System","Dreamcast","3DO","Jaguar","Game Gear","Neo Geo"
  ]

  



  const navegate = useNavigate()
  const dispatch= useDispatch()
  
  const [error, setError] = useState({})
  const [input, setInput] = useState({
      name:"",
      description_raw: "",
      released: "",
      background_image: "",
      rating: 0,
      platforms: [],
      genres: [],

  })
  
  useEffect(()=>{
    dispatch(getGender())
  },[dispatch])
  
  const genders = useSelector(state => state.genders)
  

  const handleChange = (e)=>{
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setError(validacionError({
      ...input,
      [e.target.name] : e.target.value
    }))
  
  }
  const handleSelectPlataforms =(e)=>{
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value]
    })
  }
 

  const handleCheckbox = (a)=>{
    if(a.target.checked){  
      setInput({
      ...input,
      genres: [...input.genres,a.target.value]
    })}
  }

  const hadleDelete = (e)=>{
    setInput({
      ...input,
      platforms: input.platforms.filter(plataformas => plataformas !== e)
    })
  }
  const handleSubmite =(e)=>{
   
    dispatch(postVideogame(input))
    alert("videogames add")
   
    setInput({
      name:"",
      description_raw: "",
      released: "",
      background_image: "",
      rating: 0,
      platforms: [],
      genres: [],
    }) 
  }


  return (
    <div className={css.conteiner}>
       <div className={css.header}>
        <h1 className={css.title}>FORMA PARTE DE NUESTRA COMUNIDAD</h1>
        <button onClick={()=> navegate('/Home')}>VOLVER</button>
       </div> 
      <div className={css.conteiner__form}>  
        <div className={css.conteiner__form_items}>
         
    <h4 className=''>Comparti tus juegos con los demas usuarios</h4>
   
   
    <form onSubmit={(e)=>handleSubmite(e)}>

        <p>
          <div> 
            <label>Nombre</label>
            <input 
            type= "text"
            value= {input.name}
            name= "name"
            onChange={(e) => handleChange(e)}
            placeholder='Name...'
            required/>
            {error.name && (<p className={css.text_ERROR}>{error.name}</p>)}
            <br/>
          </div>
        </p>  
        <p>
          <div>
            <label>Imagen</label>
            <input
            type="text"
            value={input.background_image}
            name="background_image"
            onChange={(e) => handleChange(e)}
            placeholder='Imagen'
            required
            />
            {error.background_image && (<p className={css.text_ERROR}>{error.background_image}</p>)}
            
          </div>
        </p>
          
        <p>  
           <div>
            <label>Fecha de Lanzamiento </label>
            <input 
            type= "date"
            value={input.released}
            name= "released"
            onChange={(e) => handleChange(e)}
            required
            />
            {error.released && (<p className={css.text_ERROR}>{error.released}</p>)}
            <br/>
          </div>
        </p> 
        <p>
          <div>
          <label>Rating</label>
            <input 
            type="number"
            value={input.rating}
            name= "rating"
            onChange={(e) => handleChange(e)}
            placeholder='Rating'
            required
            />
            { error.rating && (<p  className={css.text_ERROR}>{error.rating}</p>)}
            <br/>
          </div>
        </p> 
         
        <p> 
        <div>
          <select onChange={(e) => handleSelectPlataforms(e)}>
            {plataformas.map(e=>(
              <>
              <option value={e}>{e}</option>
             </>
            ))}
          </select>
        </div>
        <ul><li>
          {input.platforms.map(e => <div
          ><p>{e}</p><button className='pepe'
          onClick={()=>hadleDelete(e)}
          >x</button>
          </div>)}
          </li></ul>

      </p>
      
      <p>
        <div>
      {
        genders?.map(e=>(
          <div className={css.checked} key={e.id}>
            <label >{e.genres}</label>
            <input
            type="checkbox"
            name="genres"
            value={e.id}
            onChange={a => handleCheckbox(a)}
            
            />
          </div>
        ))
        } 
      
        <ul>{input.genres.map(e => e + " ")}</ul>
        </div>
        </p> 
        <p>
            <label >Descripcion </label>
            <textarea
            type= "textarea"
            value={input.description_raw}
            name= "description_raw"
            onChange={(e) => handleChange(e)}
            placeholder='Description"
            '/>
            
        </p>
        {error.description_raw && (<p className={css.text_ERROR}>{error.description_raw}</p>)}
        <p>
          <button type='submit'>Crear Videogame</button>
        </p>

    </form>
        </div>
      </div>
    </div>

  )
}

export default Forms
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useNavigate} from 'react-router-dom'
import { getGemeId } from '../actions'
import css from '../Css/details.module.css'




const Details = () => {
    const dispatch = useDispatch()

    const params = useParams()
    const navegate = useNavigate()

    const gameDetail = useSelector(game => game.details)
   
    useEffect(()=>{
        dispatch(getGemeId(params.id))
    },[dispatch, params.id])

  return (
    <div>
        {
            gameDetail?.map(e=> {
                return(
                   <section className={css.container}>
                        <div className={css.imagen}> 
                        <img src={e.background_image} alt= "not found" /> 
                        
                        </div>
                        <div className={css.text}>
                        <div className={css.header}>
                        <button onClick={()=>navegate('/Home')}>HOME</button>
                        <h1>{e.name}</h1>
                        </div>
                        <h3>{e.description_raw}</h3>
                        <h2>generos: {e.genders?.map(e=>e.genres).join(" ")}</h2>
                        <h2>plataforma: {e.platforms}</h2>
                        <h2>lanzamiento: {e.released}</h2>
                        <h2>rating: {e.rating}</h2> 
                       
                        </div>
                   </section>
                )
            })   
        }
        
    </div>


  )
}

export default Details
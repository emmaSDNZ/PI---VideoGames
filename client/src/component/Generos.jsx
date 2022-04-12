import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {allGames, getGender, genresFilter} from '../actions/index'
import {NavLink,  useNavigate} from 'react-router-dom'
import CardGame from './CardGame'
import css from '../Css/generos.module.css';

const Generos = () => {
    const navegate = useNavigate()
    const dispatch = useDispatch()
    const gamesAll = useSelector(game => game.filter)
   
    
    const generos = useSelector(game => game.genders)
    
    useEffect(()=>{
        dispatch(getGender())
        dispatch(allGames())
    },[dispatch])

    const handleGeneros= (e)=>{
        dispatch(genresFilter(e.target.value))
    }

  return (
    <div className={css.container}>
        <div> 

            <button onClick={e => navegate('/Home')}>Home</button>
            <select onChange={e=> handleGeneros(e) }>
                <option value="all"> BUSQUEDA POR GENEROS</option>
                {generos?.map(e=>(
                <option key={e.id} value={e.genres}>{e.genres}</option> 
                ))}
            </select> 
        </div> 
                    {
                    gamesAll.length >=100 || gamesAll.length ===0? <p>NO SE ENCONTRARON JUEGOS..</p> :
                    gamesAll.map(e=>{
                        return(
                            <div  clasName={css.caja}key={e.id}>
                                <NavLink to = {`/home/${e.id}`}
                                className={css.navlink}>
                                <CardGame  name={e.name} background_image={e.background_image} key={e.id}/>
                                </NavLink>
                            </div>
                        )}) 
                }
        <div> 
        </div>
    </div>
  )
}

export default Generos
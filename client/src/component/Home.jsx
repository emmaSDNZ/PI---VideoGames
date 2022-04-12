import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getGames,getGender, } from '../actions/index'
import CardGame from './CardGame'
import { NavLink, useNavigate } from 'react-router-dom'
import SerchBar from './SerchBar'
import css from '../Css/home.module.css'



const Home = () => {

    const navegate = useNavigate()
    const dispatch = useDispatch()  
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState("DESC");
    const [orderBy, setOrderBy] = useState("rating")
    const [filter, setFilter] = useState("existing")

   useEffect(()=>{
     
    dispatch(getGames(page,order,orderBy,filter))
    dispatch(getGender())
    },[dispatch, page,order, orderBy,filter] 
    ) 
    let allGames = useSelector(game => game.videogames )
    //paginado
    const prev = (e)=>{
      e.preventDefault();
      page <= 0 ? setPage(0) : setPage(page-15)
    }
    const next = (e) =>{
      e.preventDefault();
      if(allGames.length < 15){ return } else setPage(page+15)
    }
    //order ASC o DESC
    const changeOrder = (e)=>{
      e.preventDefault();
      setOrder(e.target.value)
    }
    const changeOrderBy = (e)=>{
      e.preventDefault();
      setOrderBy(e.target.value)
    }
    // order existente o agregado 
    const changeFilter = (e)=>{
      e.preventDefault();
      setFilter(e.target.value)
    } 
    const handleReset = (e)=>{
      e.preventDefault();
      dispatch(getGames(page,order,orderBy,filter))
    }

  return (
<div className={css.container}> 
    <header>
      <div className={css.container_menu}>
       <div className={css.container_menu_button}>
         <button onClick={(e)=> handleReset(e)}>RESET</button>
       </div>
        <div className={css.container_menu_item}>  
          <SerchBar/>
        </div>
        <div className={css.container_menu_button}>
           <button
           onClick={()=> navegate('/Forms')}>CREAR VIDEOGAME</button>
          </div> 
        <div className={css.container_menu_button}>
            <button 
            onClick={()=>navegate('/Genders')}>BUSCAR POR GENERO</button>
        </div> 
        </div>
      </header> 

<div className={css.conteiner_2}>       
    {/* ordenamiento para ASC y DESC */}
  <div className={css.conteiner_2_ad}>
      <div>
      <p>Alfabetico</p>
      <select onChange={e=> changeOrder(e)}>
        <option value='ASC'>ASCENDENTE</option>
        <option value='DESC'>DESCENDENTE</option>
      </select>
      </div>

    {/* ORDERBY */}
    <div>
      <p>OrderBY</p>
      <select onChange={e=> changeOrderBy(e)}>
        <option value='name'>Name</option>
        <option value='rating'>Rating</option>
        <option value='id'>ID</option>
        <option value='released'>Fecha de lanzamiento</option>
      </select>
    </div>

    {/* ORDER POR FILTER */} 
    <div>
    <p>Filtros</p>
      <select onChange={e => changeFilter(e)}>
        <option value='existing'>Existentes</option>
        <option value='added'>Creados</option>
      </select>
    </div> 

      {/* PAGINADO */}
    <div>
    <button
      onClick={e=>{ prev(e)}}
      disabled= {page<=0}
      >
      {"<--Prev"}</button>

    <button
      onClick={e=>{ next(e)}}
      disabled= {allGames.length < 15}
      >
      {"Next -->"}</button>
    </div>
  </div>  
  <div className={css.imagen}>
      {  
        allGames.length === 0? <p>...Loading</p> : 
        allGames.map(e=>{
          return (
            <div key={e.id}> 
              <NavLink to={`/home/${e.id}`}  
               className={css.navlink}
               >
              <CardGame name={e.name} background_image={e.background_image} genders={e.genders} key={e.id} rating={e.rating}/>
              </NavLink>
            </div>   
          )
        }) 
      }
  </div>


</div>
</div>
  )
  
}

export default Home
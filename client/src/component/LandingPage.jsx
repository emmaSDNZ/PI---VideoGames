import React from 'react'
import landing from '../Css/landingPage.module.css'
import { useNavigate } from 'react-router-dom'
import css from '../Css/landingPage.module.css'
const LandingPage = () => {
    const navegate = useNavigate()
  return (

   <div className={css.containar}>
      <div className={css.conteinar__item}>
        <div className={css.conteinar__title}>

          <h1>GAM<label>Er</label>PEDIA</h1>

        </div>
        <div className={css.conteinar__text}>
          <p>"BUSCA LOS MEJORES JUEGOS EN TUS ENCICLO<label>-GAMER</label>: ACCION, AVENTURA, DEPORTES, Y MAS"</p>

        </div>
        <div  className={css.conteinar__button}>
          <button 
            onClick={()=>navegate('/Home')}>
               PLAYGAME 
          </button> 
        </div>
       </div>  
    </div> 

  )
}

export default LandingPage


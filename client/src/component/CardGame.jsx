import React from 'react'
import css from '../Css/cardGame.module.css'

const CardGame = ({background_image, name, genders, id, rating}) => {
   
  return (
    <div className={css.container}>
      <div className={css.imga}>
        <h2>{name}</h2>
        <img 
            src={background_image} alt= "not found" 
          />
        <h3>{genders?.map(e=> e.genres).join(" ")}</h3>
         
     </div>
    </div>
  )
}

export default CardGame
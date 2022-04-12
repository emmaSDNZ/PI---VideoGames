import React from 'react'
import {useDispatch, useSelector} from 'react-redux'


const AllGames = (allGames) => {

    let allGames = useSelector(game => game.videogames )
    
  return (
      <div>
    {
        allGames?.map(e=>{
          return (
            <div> 
              <NavLink to = {`/home/${e.id}`}>
              <CardGame name={e.name} background_image={e.background_image} genders={e.genders} key={e.id} rating={e.rating}/>
              </NavLink>
            </div>
            
          )
        }) 
      }
      </div>
  )
}

export default AllGames
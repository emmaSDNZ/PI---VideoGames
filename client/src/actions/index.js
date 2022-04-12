import axios  from 'axios';


export const getGames = (page, order, orderBy, filter)=>{
    return function(dispatch){
        return fetch('http://localhost:3001/videogames?page=' + page + '&order=' + order + '&orderBy=' + orderBy + '&filter=' + filter)
        .then(response=> response.json())
        .then(json =>{
            dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json
            })
        })
    }
}

export const allGames = ()=>{
    return function(dispatch){
        return fetch(`http://localhost:3001/allGames`)
        .then(response => response.json())
        .then(json =>{
            dispatch({
                type: "ALL_GAMES",
                payload: json
            })
        })
    }
}

export const getGemeId = (id)=>{
    return function(dispatch){
       return fetch('http://localhost:3001/videogames/'+ id)
        .then(response => response.json())
        .then(json =>{
            dispatch({
                type: "GET_DETAILS",
                payload: json
            })
        })

    } 
}


export const getNameVideogame = (name)=>{
   
    return function(dispatch){
        return fetch('http://localhost:3001/videogames?name='+ name)
        .then(response => response.json())
        .then(json =>{
            dispatch({
                type: "GET_NAME_VIDEOGAME",
                payload: json
               
            }) 
        })
       
    }
}

export const getGender = ()=>{
    return function (dispatch){
        return fetch('http://localhost:3001/gender')
        .then(response => response.json())
        .then(json =>{
            dispatch({
                type: "GET_GENDER",
                payload: json
            })
        })
    }
}

 export const genresFilter = (payload)=>{
    return {
        type: "GENDERS_FILTER",
        payload: payload
    }
}  

export const postVideogame =(payload)=>{
        return async function(dispatch){
            const postData = await axios.post('http://localhost:3001/videogame', payload)
            return postData;
        }
}



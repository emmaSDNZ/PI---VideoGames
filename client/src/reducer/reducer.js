
const initialState = {
    videogames : [],
    allVideogames: [],
    details: [],
    genders: [],
    filter: [], 
    
}

const rootReducer = (state = initialState, action)=>{
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload
            }
        case 'ALL_GAMES':
            return {
                ...state,
                allVideogames: action.payload,
                filter: action.payload
            }
        case 'GET_DETAILS': 
        return{
                ...state,
                details: action.payload
        }
        case "GET_NAME_VIDEOGAME":
            const getName= action.payload   
            if(getName.length === 0){ alert("game not found")} else {
                return {
                ...state,
                videogames: action.payload
            } 
                }
        
        case "POST_VIDEOGAME":
            return {
                ...state,
            } 
        case "GET_GENDER":
            return {
                ...state,
                genders: action.payload
            } 

        case "GENDERS_FILTER": 
        const todosgame = state.allVideogames
        console.log(todosgame)
        const allGames = state.allVideogames;
        const filterGeners = allGames.filter(e=> {
            if(e.genders){
                const genero = e.genders.map(e=> e.genres)
                return genero.includes(action.payload)
            }
            if (e.genders) { 
                return e.genders.includes(action.payload)
            }
        })
        
       return {
           ...state,
           filter: action.payload === "all"? todosgame : filterGeners
       }  
            
        default:
            return state;
    }

}

export default rootReducer
const { Router } = require('express');
const axios = require('axios')
const {Op} = require('sequelize')
const  bodyParser  =  require ( 'body-parser' )
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Videogame, Gender} = require('../db');


const link = "27755a4db9dc45de8a61a223c3f67d9b"
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);7

//ME TRAE TODO LOS IDs
const dataApiID = async()=>{
    const idArray =[]
    try {
        for(let i = 1 ; i<=5; i++) {
            const api = await axios.get(`https://api.rawg.io/api/games?key=${link}&page=${i}`)
            const apiID = api.data.results.map(e=> e.id)
            idArray.push(apiID)
        }
         return idArray.flat();
    } catch (error) {
        console.log(error)
    }
}


const dataApiINFO = async() =>{
    
 try {
    const ids = await dataApiID();
    const dataApi =await  Promise.all(ids.map( id => { return axios.get(`https://api.rawg.io/api/games/${id}?key=${link}`)}))
    const gamesALL = dataApi.map(e=> e.data);
    const game = gamesALL.map(e=> {
        return {
           
            name: e.name,
            description_raw: e.description_raw,
            released: e.released,
            rating: e.rating,
            background_image: e.background_image,
            platforms: e.platforms.map(e=> e.platform.name),
            genres: e.genres.map(e => e.id),
            status: 'existing'

        }
    })
    return game;
    
 } catch (error) {
     console.log(error)
 }
}

 /* /Promise.all(main_res.results.map( item => { return axios.get(https://api.rawg.io/api/games/${e}?key=e2c544ade6134ccb9548fda28494fde5) }))
.then(nuevo_arreglo => {  // el resultado será un arreglo nuevo con los resultados de cada Promesa (siempre que todas hayan sido resueltas)
  nuevo_arreglo.forEach(result => {
    console.log(result.data);  // el resultado está en la propiedad data del objeto devuelto
  });
});  */ 

const genderApi = async() =>{
    try {
        const gender = await axios.get(`https://api.rawg.io/api/genres?key=${link}`)
        const genderAll = await gender.data.results.map( e=> {return {id: e.id , genres: e.name}})
       
    return genderAll;

    } catch (error) {
        console.log(error)
    }
}


router.get('/videogames/:id', async(req,res,next)=>{
    const id = req.params.id
    try {
        if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
           // let idGames = await Videogame.findByPk(id);         
            let idGames = await Videogame.findAll({
                where: {
                    id:id
                },
                 include: [
                    {
                        model:Gender,
                        attributes: ["genres"],
                        through:{
                            attributes: []
                        } 
                    }
                ] 
            })
            return res.json(idGames)
        } else {
            return res.send("id not found")
        }
    } catch (error) {
        next(error)
    }
})


router.get('/videogames', async(req, res, next) => {
    const {name, filter} = req.query
    try {
         //cargo mi tabla de generos con los datos que me llegan de la API.
        const genders = await genderApi()
        const generoBD = await Gender.findAll()
        generoBD.length===0 ?  await Gender.bulkCreate(genders) : generoBD;
     } catch (error) {
         next(error)
     }
   try {
          //cargo  mi tabla: VideoGames, y hago un mixin con los generos 
        const games = await dataApiINFO()
        const gameBD = await Videogame.findAll()
        if(gameBD.length === 0){
             const preba = await Promise.all( games.map (async(e)=> {
          const [gameDb, created] = await Videogame.findOrCreate({
              where: {
                  name: e.name, 
                  description_raw: e.description_raw,
                  released: e.released,
                  background_image: e.background_image,
                  rating: e.rating,
                  platforms: e.platforms,
                  status: 'existing'
                }
          })
          await gameDb.addGenders(e.genres)
          return 
       }))
        }
       

       } catch (error) {
       next(error)
   }

   if(name){
    try {
       const gameName = await Videogame.findAll({
           where: {
               name: {
                   [Op.iLike]: `%${name}%`
                }
           },
           include: [
               {
                   model:Gender,
                   attributes: ["genres"],
                   through:{
                       attributes: []
                   } 
               }
           ]
       })
       return res.json(gameName)
    } catch (error) {
        next(error)
    }
   }else {
    try{
        let game = await Videogame.findAll({
            where: {
                status: req.query.filter,
            },
            limit: 15,
            offset: req.query.page, 
            order:[[req.query.orderBy, req.query.order]],
            include: {model : Gender}
        })
        return res.json(game)
    }catch(error){
        next(error)
    }
   }
     })
   

router.get('/gender', async(req, res, next)=>{
     try {
        
        let genderDB = await Gender.findAll({
            attributes: ['genres','id']
        })
        if(genderDB.length === 0){
            await Gender.bulkCreate(genderDB)
        }
      return  res.send( genderDB )
     } catch (error) {
         next(error)
     }
 })

 router.get('/allGames', async(req,res,next)=>{
    try {
        const allGames = await Videogame.findAll({
            include: {model : Gender}
        })
        res.json(allGames)
    } catch (error) {
        next(error)
    }
 })

 router.post('/videogame', async(req, res, next)=>{
   const {name, description_raw, released, rating, platforms, genres, background_image} = req.body
   try {
       let [gameCreate, created] = await Videogame.findOrCreate({
           where: {
            name: name, 
            description_raw: description_raw, 
            background_image: background_image,
            released: released, 
            rating:rating,
            platforms: platforms,
            status: "added"
           }
       })
       await gameCreate.setGenders(genres)
       return res.send("add game")
   } catch (error) {
       next(error)
   }
 }) 

 

module.exports = router;
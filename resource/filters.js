const mongoose=require('mongoose');
const Purchase=mongoose.model('Purchase');
const User=mongoose.model('User');
const Videogames=mongoose.model('Videogame');
const Ads=mongoose.model('Ad');



function requestFilters(query){ 
  const queryResult={}
  const {user,_user,relaseDate,status,deliveryDate}=query
  const regexDate=/[\[\]']+/g
  console.log('fechas ',relaseDate)
  if(user!==undefined){
    queryResult.idUser=user
  }
  if(_user!==undefined){
    queryResult.idUser={$ne:_user}
  }
  if(status!==undefined){
    queryResult.status=status
  }
  if(deliveryDate!==undefined){
    let date
    if(deliveryDate.includes('[')&&deliveryDate.includes(']')){
      date=deliveryDate.split(regexDate)[1].split(',')
      queryResult.deliveryDate={$gte:new Date(date[0]),$lte:new Date(date[1])}
     
    }else if(deliveryDate.includes('[')){
      date=deliveryDate.split(regexDate)[1]
      queryResult.deliveryDate={$gte:new Date(date)}
    }else if(deliveryDate.includes(']')){
      console.log('fecha ',deliveryDate.split(regexDate))
      date=deliveryDate.split(regexDate)[1]
      queryResult.deliveryDate={$lte:new Date(date)}
    }
    
  }
  if(relaseDate!==undefined){
    let date
    if(relaseDate.includes('[')&&relaseDate.includes(']')){
      date=relaseDate.replace(regexDate,'').split(',')
      queryResult.relaseDate={$gte:new Date(date[0]),$lte:new Date(date[1])}
     
    }else if(relaseDate.includes('[')){
      date=relaseDate.replace(regexDate,'')
      queryResult.relaseDate={$gte:new Date(date)}
    }else if(relaseDate.includes(']')){
      date=relaseDate.replace(regexDate,'')
      queryResult.relaseDate={$lte:new Date(date)}
    }
    
  }
  
  return queryResult
}

function adFilters(query){ 
  const queryResult={}
  const {adviser,videogame,platform,status,price}=query
  const regexDate=/[\[\]']+/g
  console.log('fechas ',platform)
  if(adviser!==undefined){
    queryResult.idAdvertiser=adviser
  }
  if(videogame!==undefined){
    queryResult.idVideogame=videogame
  }
  if(platform!==undefined){
    queryResult.idPlatform=platform    
  }
  if(status!==undefined){
    queryResult.status=status
  }
  if(price!==undefined){
    let cost
    if(price.includes('[')&&price.includes(']')){
      cost=price.split(regexDate)[1].split(',')
      queryResult.price={$gte:cost[0],$lte:cost[1]}
     
    }else if(price.includes('[')){
      cost=price.split(regexDate)[1]
      queryResult.price={$gte:cost}
    }else if(price.includes(']')){
      console.log('fecha ',price.split(regexDate))
      cost=price.split(regexDate)[1]
      queryResult.price={$lte:cost}
    }
    
  }

  return queryResult
}

function videogameFilters(query){ 
  const queryResult={}
  const {releaseDate,name,platform,language,genre,category,synopsis}=query
  const regexDate=/[\[\]']+/g
  console.log('fechas ',platform)
  
  if(name!==undefined){
    queryResult.name={$regex:`.*${name}.*`, $options:'i'}
  }
  if(platform!==undefined){
    queryResult.idPlatform=platform    
  }
  if(language!==undefined){
    queryResult.language={$regex:`.*${language}}.*`, $options:'i'}
  }
  if(genre!==undefined){
    queryResult.genre={$regex:`.*${genre}.*`, $options:'i'}
  }
  if(category!==undefined){
    queryResult.category={$regex:`.*${category}.*`, $options:'i'}
  }
  if(synopsis!==undefined){
    queryResult.synopsis={$regex:`.*${synopsis}.*`, $options:'i'}
  }
  if(releaseDate!==undefined){
    let date
    if(relaseDate.includes('[')&&relaseDate.includes(']')){
      date=relaseDate.replace(regexDate,'').split(',')
      queryResult.relaseDate={$gte:new Date(date[0]),$lte:new Date(date[1])}
     
    }else if(relaseDate.includes('[')){
      date=relaseDate.replace(regexDate,'')
      queryResult.relaseDate={$gte:new Date(date)}
    }else if(relaseDate.includes(']')){
      date=relaseDate.replace(regexDate,'')
      queryResult.relaseDate={$lte:new Date(date)}
    }
    
  }
  return queryResult
}

/**
 * Validate if filter populate has values and return and array values
 * if hasn't values return empty array
 * @param  query 
 * @returns Array
 */

function validatePopulate(query){
  let {populate}=query
  if(populate!==undefined){
    if(populate.includes('[')&&populate.includes(']')){
      populate=populate.replace(/[\[\]']+/g,'').split(',')
      return populate
    }
  }
  return [];
}

/**
 * make the query to populate field's Purchase model register
 * @param Object query fields to populate
 * @return Array query  
 */

function populatePurchaseRequest(querys){
  let fields=validatePopulate(querys)
  let query=[]
  fields.map(field=>{
    if(field==='user'){
      query.push({path:'idUser',select:'-hash -salt'})
    }
    if(field==='adviser'){
      query.push({path:'idAdvertiser'})
    }
  })
  
  return query;
}


/**
 * make the query to populate field's Ad model register
 * @param Object query fields to populate
 * @return Array query 
 */

 function populateAd(querys){
  let fields=validatePopulate(querys)
  let query=[]
  fields.map(field=>{
    if(field==='videogame'){
      query.push({path:'idVideogame'})
    }
    if(field==='adviser'){
      query.push({path:'idAdvertiser'})
    }
    if(field==='platform'){
      query.push({path:'idPlatform'})
    }
  })
  
  return query;
}

/**
 * make the query to populate field's Videogame model register
 * @param Object query fields to populate
 * @return Array query 
 */

 function populateVideogame(querys){
  let fields=validatePopulate(querys)
  let query=[]
  fields.map(field=>{

    if(field==='platform'){
      query.push({path:'idPlatform'})
    }
  })
  
  return query;
}



function typeModel(url){
  let modelUrl
   modelUrl=url.split('/')[2].split('?')[0]
  if(modelUrl==='users'){
    return User
  }
  if(modelUrl==='videogames'){
    return Videogames
  }
  if(modelUrl==='ads'){
    return Ads
  }
  if(modelUrl==='purchaserequest'){
    return Purchase
  }
  
}


module.exports={
  requestFilters,
  adFilters,
  videogameFilters,
  typeModel,
  validatePopulate,
  populatePurchaseRequest,
  populateVideogame,
  populateAd
}
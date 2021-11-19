const mongoose=require('mongoose');
const Purchase=mongoose.model('Purchase');
const User=mongoose.model('User');
const Videogames=mongoose.model('Videogame');
const Ads=mongoose.model('Ad');


function requestFilters(query){ 
  const queryResult={}
  const {user,_user,requestDate,status,deliveryDate}=query
  const regexDate=/[\[\]']+/g
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
      let date=deliveryDate.replace(regexDate,'').split(',')
    if(deliveryDate.includes('[')&&deliveryDate.includes(']')){
      if(date.length>1)
        queryResult.deliveryDate={$gte:new Date(date[0]),$lte:new Date(date[1])}
      else
        queryResult.deliveryDate={$eq:new Date(date[0])}
    }else if(deliveryDate.includes('[')){
      queryResult.deliveryDate={$gte:new Date(date[0])}
    }else if(deliveryDate.includes(']')){
      queryResult.deliveryDate={$lte:new Date(date[0])}
    }
    
  }
  if(requestDate!==undefined){
    let date=requestDate.replace(regexDate,'').split(',')
    if(requestDate.includes('[')&&requestDate.includes(']')){
      if(date.length>1)
        queryResult.createdAt={$gte:new Date(date[0]),$lte:new Date(date[1])}
      else
        queryResult.createdAt={$eq:new Date(date[0])}
    }else if(requestDate.includes('[')){
      queryResult.createdAt={$gte:new Date(date[0])}
    }else if(requestDate.includes(']')){
      queryResult.createdAt={$lte:new Date(date[0])}
    }
    
  }
  
  return queryResult
}

function adFilters(query){ 
  const queryResult={}
  const {condition,videogame,platform,status,price,advertiser,_advertiser}=query
  const regexDate=/[\[\]']+/g
 
  if(advertiser!==undefined){
    queryResult.idAdvertiser=advertiser
  }
  if(_advertiser!==undefined){
    queryResult.idAdvertiser={$ne:_advertiser}
  }
  if(videogame!==undefined){
    queryResult.idVideogame=videogame
  }
  if(platform!==undefined){
    let plat=platform.replace(regexDate,'').split(',')
    queryResult.platforms={$regex:`^${plat}.*`, $options:'i'}    
  }
  if(status!==undefined){
    queryResult.status=status
  }
  if(condition!==undefined){
    queryResult.condition={$regex:`.*${condition}.*`, $options:'i'}
  }
  if(publishDate!==undefined){
    let  date=publishDate.replace(regexDate,'').split(',')
    if(publishDate.includes('[')&&publishDate.includes(']')){
      if(date.length>1)
        queryResult.createdAt={$gte:new Date(date[0]),$lte:new Date(date[1])}
      else
        queryResult.createdAt={$eq:new Date(date[0])}
    }else if(publishDate.includes('[')){
      queryResult.createdAt={$gte:new Date(date[0])}
    }else if(publishDate.includes(']')){
      queryResult.createdAt={$lte:new Date(date[0])}
    }
    
  }
  if(price!==undefined){
    let cost=price.replace(regexDate,'').split(',')
    if(price.includes('[')&&price.includes(']')){
      if(cost.length>1)
        queryResult.price={$gte:cost[0],$lte:cost[1]}
      else
        queryResult.price={$eq:cost[0]}
    }else if(price.includes('[')){
      queryResult.price={$gte:cost[0]}
    }else if(price.includes(']')){
      queryResult.price={$lte:cost[0]}
    }
    
  }

  return queryResult
}

function videogameFilters(query){ 
  const queryResult={}
  const {releaseDate,name,platform,language,genre,category,synopsis}=query
  const regexDate=/[\[\]']+/g
  
  if(name!==undefined){
    queryResult.name={$regex:`.*${name}.*`, $options:'i'}
  }
  if(platform!==undefined){
    let plat=platform.replace(regexDate,'').split(',')
    queryResult.platforms={$regex:`^${plat}.*`, $options:'i'}    
  }
  if(language!==undefined){
    if(language.includes('[')&&language.includes(']')){
      let lang =language.replace(regexDate,'').split(',')
      queryResult.$or=queryRegex('languages','^','.*',lang,'i')
    }
  }
  if(category!==undefined){
    if(category.includes('[')&&category.includes(']')){
      let cat=category.replace(regexDate,'').split(',')
      queryResult.$or=queryRegex('ageCategory','^','.*',cat,'i')
    }
  }
  if(genre!==undefined){
    if(genre.includes('[')&&genre.includes(']')){
      let gen=genre.replace(regexDate,'').split(',')
      queryResult.$or=queryRegex('genre','^','.*',gen,'i')
    }
  }
  if(synopsis!==undefined){
    queryResult.synopsis={$regex:`.*${synopsis}.*`, $options:'i'}
  }
  if(releaseDate!==undefined){
    let  date=releaseDate.replace(regexDate,'').split(',')
    if(releaseDate.includes('[')&&releaseDate.includes(']')){
      if(date.length>1)
        queryResult.releaseDate={$gte:new Date(date[0]),$lte:new Date(date[1])}
      else
        queryResult.releaseDate={$eq:new Date(date[0])}
    }else if(releaseDate.includes('[')){
      queryResult.releaseDate={$gte:new Date(date[0])}
    }else if(releaseDate.includes(']')){
      queryResult.releaseDate={$lte:new Date(date[0])}
    }
    
  }
  return queryResult
}

/**
 * Function to return a regex expression query for one field
 * @param {String} field to be query 
 * @param {String} initial initial value of regex 
 * @param {String} end end value of regex
 * @param {Array} values  values in the middle regex explession
 * @param {String} options options regex expression
 * @return {Array} query array regex object 
 */

function queryRegex(field,initial,end,values,options){
  let filters=[] 
  values.map(value=>{
    filters.push({[field]:{$regex:`${initial}${value}${end}`,$options:options}})
  })
  

  return filters
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
    if(field==='advertiser'){
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
    if(field==='advertiser'){
      query.push({path:'idAdvertiser',select:'-hash -salt'})
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


function sortAd(query){
  const {sort:sortBy}=query
  let queryResult={}
  const regex=/[\[\]']+/g
  if(sortBy){
    let typeSort,sort=sortBy.replace(regex,'').split(',')
    if(sort[1]==='asc')
      typeSort=1 
      else if (sort[1]==='desc')
      typeSort=-1
    if(sort[0]=='price')
      queryResult.price=typeSort
    if(sort[0]=='status')
      queryResult.status=typeSort
    if(sort[0]=='publishDate')
      queryResult.createdAt=typeSort
  }
  console.log('query ',queryResult)
  return queryResult
}

function sortPurchase(query){
  const {sort:sortBy}=query
  let queryResult={}
  const regex=/[\[\]']+/g
  if(sortBy){
    let typeSort,sort=sortBy.replace(regex,'').split(',')
    if(sort[1]==='asc')
      typeSort=1 
      else if (sort[1]==='desc')
      typeSort=-1
    if(sort[0]=='relaseDate')
      queryResult.relaseDate=typeort
      if(sort[0]=='deliveryDate')
      queryResult.deliveryDate=typeSort
      if(sort[0]=='status')
      queryResult.status=typeSort
  }
  return queryResult
}

function sortVideogame(query){
  const {sort:sortBy}=query
  let queryResult={}
  const regex=/[\[\]']+/g
  if(sortBy){
    let typeSort,sort=sortBy.replace(regex,'').split(',')
    if(sort[1]==='asc')
      typeSort=1 
      else if (sort[1]==='desc')
      typeSort=-1
    if(sort[0]=='category')
      queryResult.ageCategory=typeSort
      if(sort[0]=='name')
      queryResult.name=typeSort
      if(sort[0]=='releaseDate')
      queryResult.releaseDate=typeSort
  }
  console.log('query ',queryResult)
  return queryResult
}

/**
 * Validate if filter populate has values and return and array values
 * if hasn't values return empty array
 * @param  query 
 * @returns value
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
 * Validate if filter populate has values and return and array values
 * if hasn't values return empty array
 * @param  query 
 * @returns value
 */

 function validateSort(query){
  let {sort:sortBy}=query
  if(sortBy!==undefined){
    if(sortBy.includes('[')&&sortBy.includes(']')){
      sortBy=sortBy.replace(/[\[\]']+/g,'').split(',')
      return sortBy[0]
    }
  }else if(sortBy===undefined){
    return undefined
  }
  return false
}


function limit(query){
  const {limit}=query
  if(limit){
    return parseInt(limit)
  }
  return parseInt('')
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
  if(modelUrl==='purchaserequests'){
    return Purchase
  }
  
}


module.exports={
  requestFilters,
  adFilters,
  videogameFilters,
  typeModel,
  validatePopulate,
  validateSort,
  populatePurchaseRequest,
  populateVideogame,
  populateAd,
  sortAd,
  sortPurchase,
  sortVideogame,
  limit
}
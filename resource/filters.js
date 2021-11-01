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

function populatePurchaseRequest(fields){
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
  typeModel,
  validatePopulate,
  populatePurchaseRequest
}
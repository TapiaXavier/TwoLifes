function requestFilters(query){ console.log('filters');
  const queryResult={}
  const {user,relaseDate,status,deliveryDate}=query
  if(user!==undefined){
    queryResult.idUser=user
  }
  if(relaseDate!==undefined){
   queryResult.relaseDate=relaseDate
  }
  if(status!==undefined){
    queryResult.status=status
  }
  if(deliveryDate!==undefined){
    let date,regex
    if(deliveryDate.includes('[')&&deliveryDate.includes(']')){
      regex=/\[(.*?)\]/
      date=deliveryDate.split(regex)[1].split(',')
      queryResult.deliveryDate={$gte:new Date(date[0]),$lte:new Date(date[1])}
     
    }else if(deliveryDate.includes('[')){
      regex=/\[.*?/
      date=deliveryDate.split(regex)[1]
      queryResult.deliveryDate={$gte:new Date(date)}
    }else if(deliveryDate.includes(']')){
      regex=/(.*?)\]/
      date=deliveryDate.split(regex)[1]
      queryResult.deliveryDate={$lte:new Date(date)}
    }
    
  }
  if(relaseDate!==undefined){
    let date,regex
    if(relaseDate.includes('[')&&relaseDate.includes(']')){
      regex=/\[(.*?)\]/
      date=relaseDate.split(regex)[1].split(',')
      queryResult.relaseDate={$gte:new Date(date[0]),$lte:new Date(date[1])}
     
    }else if(relaseDate.includes('[')){
      regex=/\[.*?/
      date=relaseDate.split(regex)[1]
      queryResult.relaseDate={$gte:new Date(date)}
    }else if(relaseDate.includes(']')){
      regex=/(.*?)\]/
      date=relaseDate.split(regex)[1]
      queryResult.relaseDate={$lte:new Date(date)}
    }
    
  }
  

  console.log(user,relaseDate,status,deliveryDate,'query ',queryResult)
  
  return queryResult
}

module.exports={
  requestFilters
}
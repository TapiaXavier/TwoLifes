function requestFilters(query){ console.log('filters');
  const queryResult={}
  const {user,releaseDate,status,deliveryDate}=query
  if(user!==undefined){
    queryResult.idUser=user
  }
  if(releaseDate!==undefined){
   queryResult.releaseDate=releaseDate
  }
  if(status!==undefined){
    queryResult.status=status
  }
  if(deliveryDate!==undefined){
    let date,regex
    if(deliveryDate.includes('[')&&deliveryDate.includes(']')){
      regex=/\[(.*?)\]/
      date=deliveryDate.split(regex)[1].split(',')
      queryResult.deliveryDate={'$lte':date[0],'$gte':date[1]}
     
    }else if(deliveryDate.includes('[')){
      regex=/\[.*?/
      date=deliveryDate.split(regex)[1]
      queryResult.deliveryDate={'$gte':new Date(date)}
    }else if(deliveryDate.includes(']')){
      regex=/(.*?)\]/
      date=deliveryDate.split(regex)[1]
      queryResult.deliveryDate={'$lte':date}
    }
    
  }
  if(releaseDate!==undefined){
    let date,regex
    if(releaseDate.includes('[')&&releaseDate.includes(']')){
      regex=/\[(.*?)\]/
      date=releaseDate.split(regex)[1].split(',')
      queryResult.releaseDate={'$lte':date[0],'$gte':date[1]}
     
    }else if(releaseDate.includes('[')){
      regex=/\[.*?/
      date=releaseDate.split(regex)[1]
      queryResult.releaseDate={'$gte':new Date(date)}
    }else if(releaseDate.includes(']')){
      regex=/(.*?)\]/
      date=releaseDate.split(regex)[1]
      queryResult.releaseDate={'$lte':date}
    }
    
  }
  

  console.log(user,releaseDate,status,deliveryDate,'query ',queryResult)
  
  return queryResult
}

module.exports={
  requestFilters
}
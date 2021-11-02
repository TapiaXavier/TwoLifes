const mongoose=require('mongoose');
const { typeModel } = require('../resource/filters');


module.exports=(req,res,next)=>{ 
   const model= typeModel(req.originalUrl)
   let query=req.query
  if(req.query){
    let band=[];  
      if(Object.keys(query).length!==0){
       
          for(field in query){
            if(field!=='populate')
            band.push(model.isFiltersAllowed(field));
          }
           if(!band.includes(false)){
             return next()
            }else{
              return res.status(400).send({
                status:"400",
                type:"Bad request",
                msj:"Filter its not supported by this endpoint",
                filters:`Filters allowed are: ${model.filtersAllowed().toString()}`
              })
            }
        
      }else{
        next();
      }
  }else{
   return next()
  }
  
}



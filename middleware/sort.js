const { typeModel, validateSort } = require('../resource/filters');


module.exports=(req,res,next)=>{ 
  if(req.query){
    let band=[];  
      if(Object.keys(req.query).length!==0){
        const model= typeModel(req.originalUrl)
        if(validateSort(req.query)!==undefined)
         band.push(model.isSortAllowed(validateSort(req.query)));
        if(!band.includes(false)){
          return next()
         }else{
           return res.status(400).send({
             status:"400",
             type:"Bad request",
             msj:"Sort/Order field's its not supported by this endpoint",
             filters:`Sort/Order fields allowed are: ${model.sortAllowed().toString()}`
           })
         }
      }else{
        next();
      }
  }else{
   return next()
  }
  
}
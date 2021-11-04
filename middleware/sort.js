const { typeModel, validateOrderBy } = require('../resource/filters');


module.exports=(req,res,next)=>{ 
  if(req.query){
    let band=[];  
      if(Object.keys(req.query).length!==0){
        const model= typeModel(req.originalUrl)
         band.push(model.isOrderByAllowed(validateOrderBy(req.query)));
        if(!band.includes(false)){
          return next()
         }else{
           return res.status(400).send({
             status:"400",
             type:"Bad request",
             msj:"Sort/Order field's its not supported by this endpoint",
             filters:`Sort/Order fields allowed are: ${model.orderByAllowed().toString()}`
           })
         }
      }else{
        next();
      }
  }else{
   return next()
  }
  
}
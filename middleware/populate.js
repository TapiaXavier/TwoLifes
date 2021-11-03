const { typeModel, validatePopulate } = require('../resource/filters');


module.exports=(req,res,next)=>{ 
  if(req.query){
    let band=[];  
      if(Object.keys(req.query).length!==0){
        const model= typeModel(req.originalUrl)
        for(field of validatePopulate(req.query)){
         band.push(model.isPopulateAllowed(field));
        }
        if(!band.includes(false)){
          return next()
         }else{
           return res.status(400).send({
             status:"400",
             type:"Bad request",
             msj:"Populate field's its not supported by this endpoint",
             filters:`Populate fields allowed are: ${model.populateAllowed().toString()}`
           })
         }
      }else{
        next();
      }
  }else{
   return next()
  }
  
}
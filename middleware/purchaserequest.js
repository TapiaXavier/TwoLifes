const mongoose=require('mongoose');
const { filters } = require('../resources/filters');
const Purchase=mongoose.model('Purchase');


module.exports=(req,res,next)=>{ console.log(req.query);
  if(req.query){
    let band=[];  
      if(Object.keys(req.query).length!==0){
        for(field in req.query){
         band.push(Purchase.isFiltersAllowed(field));
        }
        if(!band.includes(false)){
          return next()
         }else{
           return res.status(400).send({
             status:"400",
             type:"Bad request",
             msj:"Filter its not supported by this endpoint",
             filters:`Filters allowed are: ${Purchase.filtersAllowed().toString()}`
           })
         }
      }else{
        next();
      }
  }else{
   return next()
  }
  
}


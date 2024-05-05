const asyncErrorHandler = (asyncFunction) => {
     
    return (req,res,next)=>{
        Promise.resolve(asyncFunction(req,res,next)).catch(next)
    };
  
};

export default asyncErrorHandler


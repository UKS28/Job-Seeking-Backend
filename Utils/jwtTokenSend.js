export const sendToken= (res,user,statusCode,message)=>{

    const token=user.generateJwtToken();
    const options = {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true, // Set httpOnly to true
        secure:true,
        sameSite: 'None'
    };
    
    res.status(statusCode).cookie("token",token,options).json({
        success:"true",
        message,
        user,
        token

    })
     
}

export const sendLogout=(res,statusCode,message)=>{
    const token="";
    const options = {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true, // Set httpOnly to true
        secure:true,
        sameSite: 'None'
    };

    res.status(statusCode).cookie("token",token,options).json({
        success:"true",
        message,
    })
}
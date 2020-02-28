exports.success = (msg,data=null)=>{
    return {
        code: 200,
        success: msg,
        data:data
    }
};

exports.error = (msg)=> {
    return {
        code: 400,
        failed: msg
      };
};

const jwt = require('jsonwebtoken')


exports.authenticateToken = (request, response, next) => {
  var token = request.get('Authorization')

    try {
        var decoded =  jwt.verify(token, 'Inv091')

        if(decoded){
            request.project = decoded
        }         
        next()
        return 
    }

    catch(err) {
        return  next(err)
    }
   

}
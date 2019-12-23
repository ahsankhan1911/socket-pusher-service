var randomString = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }


 var bodyParser =  (chunk) => {
    chunk = String(chunk)
    var result = {};
    var sURLVariables = chunk.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {       
        var sParameterName = sURLVariables[i].split('=');      
        result[sParameterName[0]] = sParameterName[1];
    }
    return result;
}

 module.exports = {
     randomString,
     bodyParser
 }
 
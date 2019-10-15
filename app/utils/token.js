const fs   = require('fs');
const jwt = require('jsonwebtoken');

let options = {
    issuer:  "GSS team",
    subject:  "hoangnghiem205@gmail.com",
    audience:  "gssteam.dev",
    expiresIn:  "12h",
    algorithm:  "RS256"
};

class Token {
    
    static sign(payload, expiresIn) {
        if (expiresIn) options.expiresIn = expiresIn;
        const privateKey  = fs.readFileSync(__dirname + '/../../assets/key/private.key', 'utf8');
        return jwt.sign(payload, privateKey, options);
    }
    static verify(token, expiresIn) {
        try {
            if (expiresIn) options.expiresIn = expiresIn;
            const publicKey  = fs.readFileSync(__dirname + '/../../assets/key/public.key', 'utf8');
            return jwt.verify(token, publicKey, options);    
        } catch (error) {
            if (error['TokenExpiredError:']) return {'error': 'Token has expired'}
            else return {'error': error};
        }
        
    }

    static decode(token) {
        return jwt.decode(token, {complete: true});
    }
}

// const t = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsbmFtZSI6ImtoYW5oIGxlIiwidXNlcm5hbWUiOiJraGFuaGx2YjMiLCJlbWFpbCI6ImtoYW5obHZiM0BnbWFpbC5jb20iLCJwaG9uZSI6IjAzOTI5ODk5OTAiLCJpYXQiOjE1NTY1NjMxMDcsImV4cCI6MTU1NjYwNjMwNywiYXVkIjoiZ3NzdGVhbS5kZXYiLCJpc3MiOiJHU1MgdGVhbSIsInN1YiI6ImhvYW5nbmdoaWVtMjA1QGdtYWlsLmNvbSJ9.GoFpvlZAFFrBSUfiDfbvQbWAgGtePRJQ-kW6GrMjHoRd13bKosfzaGAAYY0zj4W1-O79Xi3ZhbUy0bARFlca2g';
// const a = Token.decode(t);
// const b = Token.verify(t);
// console.log('====================================');
// console.log(a);

// console.log('====================================');
// console.log(b);
module.exports = Token;
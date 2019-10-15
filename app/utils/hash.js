const bcrypt = require('bcrypt');
class Hash {
    static encrypt(plaintext) {
        return new Promise( (receive, reject) => {
            bcrypt.hash(plaintext, 10, (err, hash) => {
                if (err) reject(err);
                receive(hash);
            });
        });
    }

    static compare(plaintext, hash) {
        return new Promise( (receive, reject) => {
            bcrypt.compare(plaintext, hash, function(err, res) {
                if (err) reject(err);
                receive(res);
            });
        })
    }
}
module.exports = Hash;
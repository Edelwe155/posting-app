const bcrypt = require("bcrypt");

const hashPassword = (pass) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(pass, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const comparePasswords = (pass, hashed) => {
  return bcrypt.compare(pass, hashed);
};

module.exports = { hashPassword, comparePasswords };

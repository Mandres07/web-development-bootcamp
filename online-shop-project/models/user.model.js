const db = require('../data/database');
const bcrypt = require('bcryptjs');

class User {
   constructor(email, password, name, street, postal, city) {
      this.email = email;
      this.password = password;
      this.name = name;
      this.address = {
         street: street,
         postal: postal,
         city: city
      }
   }

   async getUserByEmail() {
      return db.getDb().collection('users').findOne({ email: this.email });
   }

   async comparePassword(hashedPassword) {
      return bcrypt.compare(this.password, hashedPassword);
   }

   async signup() {
      const hashedPassword = await bcrypt.hash(this.password, 12);
      await db.getDb().collection('users').insertOne({
         email: this.email,
         password: hashedPassword,
         name: this.name,
         address: this.address
      });
   }

   async existsAlready() {
      const existingUser = await this.getUserByEmail();
      if (existingUser)
         return true;
      return false;
   }
}

module.exports = User;
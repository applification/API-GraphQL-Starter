// import mongoose from 'mongoose';
// const Schema = mongoose.Schema
// import bcrypt from 'bcrypt-nodejs'
//
// // Define our model
// const userSchema = new Schema({
//   id: { type:String, required:true, unique:true, index:true, default:mongoose.Types.ObjectId },
//   email: { type: String, unique: true, lowercase: true },
//   password: String
// })
//
// // On Save Hook, encrypt password
// userSchema.pre('save', function (next) {
//   const user = this
//
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) { return next(err) }
//
//     bcrypt.hash(user.password, salt, null, (err, hash) => {
//       if (err) { return next(err) }
//
//       user.password = hash
//       next()
//     })
//   })
// })
//
// userSchema.methods.comparePassword = function (candidatePassword, callback) {
//   bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//     if (err) { return callback(err) }
//
//     callback(null, isMatch)
//   })
// }
//
// module.exports.getListOfUsers = () => {
//   return new Promise((resolve, reject) => {
//     user.find({}).exec((err, res) => {
//       err ? reject(err) : resolve(res);
//     });
//   });
// };
//
// module.exports.getUserById = (root, {id}) => {
//   return new Promise((resolve, reject) => {
//     user.findOne({
//         id: id
//     }).exec((err, res) => {
//       err ? reject(err) : resolve(res);
//     });
//   });
// };
//
// module.exports.getUserByName = (root, {name}) => {
//   return new Promise((resolve, reject) => {
//     user.findOne({
//       name: name
//     }).exec((err, res) => {
//       err ? reject(err) : resolve(res);
//     });
//   });
// };
//
// module.exports.getUserByPosition = (root, {id}) => {
//   return new Promise((resolve, reject) => {
//     user.find({}).exec((err, res) => {
//       err ? reject(err) : resolve(res[id]);
//     });
//   });
// };
//
// module.exports.addUser = (root, {email, password}) => {
//   var newUser = new user({email:email, password:password});
//
//   return new Promise((resolve, reject) => {
//     newUser.save((err, res) => {
//       err ? reject(err): resolve(res);
//     });
//   });
// }
//
// module.exports.updateUser = (root, {id, name, email, tel}) => {
//   var updateUser = {name:name, email:email, tel:tel};
//   return new Promise((resolve, reject) => {
//     user.findOneAndUpdate(
//         { id: id },
//         { $set: updateUser },
//         { returnNewDocument: true }
//     ).exec((err, res) => {
//       err ? reject(err) : resolve(res);
//     });
//   });
// }
//
//
// // Create model class
// let user = mongoose.model('user', userSchema)
//
// // Export model
// module.exports = user

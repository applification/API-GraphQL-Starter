import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true, default: mongoose.Types.ObjectId },
  name: String,
  email: { type: String, unique: true, lowercase: true },
  password: String,
  tel: String,
  type: String
})

userSchema.pre('save', function (next) {
  const user = this

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err) }

      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err) }

    callback(null, isMatch)
  })
}

const user = mongoose.model('user', userSchema)

module.exports = user

module.exports.getListOfUsers = () => {
  return new Promise((resolve, reject) => {
    user.find({}).exec((err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}

module.exports.getUserById = (root, { id }) => {
  return new Promise((resolve, reject) => {
    user.findOne({
      id
    }).exec((err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}

module.exports.getUserByName = (root, { name }) => {
  return new Promise((resolve, reject) => {
    user.findOne({
      name
    }).exec((err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}

module.exports.getUserByPosition = (root, { id }) => {
  return new Promise((resolve, reject) => {
    user.find({}).exec((err, res) => {
      err ? reject(err) : resolve(res[id])
    })
  })
}

module.exports.addUser = (root, { name, email, tel }) => {
  const newUser = new user({ name, email, tel })

  return new Promise((resolve, reject) => {
    newUser.save((err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}

module.exports.updateUser = (root, { id, name, email, tel }) => {
  const updateUser = { name, email, tel }
  return new Promise((resolve, reject) => {
    user.findOneAndUpdate(
        { id },
        { $set: updateUser },
        { returnNewDocument: true }
    ).exec((err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}

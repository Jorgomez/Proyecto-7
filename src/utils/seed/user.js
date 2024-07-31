// const User = require('../../api/models/user')
// const mongoose = require('mongoose')
// const USERS = require('../../data/users')

// const bombUsers = async () => {
//   try {
//     await mongoose.connect(
//       'mongodb+srv://jorgomez:root@cluster0.5mxtwul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
//     )

//     await User.collection.drop()
//     console.log('Users deleted')

//     await User.insertMany(USERS)
//     console.log('Users introduced')

//     await mongoose.disconnect()
//     console.log('server desconected')
//   } catch (error) {
//     console.log('error connecting')
//   }
// }

// bombUsers()

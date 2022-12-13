const userController = require('../models/DAO/user.js')

const verifyLogin = async (userInfos) => {
    const allUsers = await userController.selectAllUsers()
    let foundUser
    
    allUsers.forEach(admin => {
        if(admin.email == userInfos.email && admin.senha == userInfos.senha) {
            foundUser = admin
        }
    })

    return foundUser
}

module.exports = {
    verifyLogin
}
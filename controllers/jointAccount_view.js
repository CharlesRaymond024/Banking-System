const JointAccount = require('../models/JointAccount')
const User = require('../models/User')
const UserJointAccount = require('../models/UserJointAccount')

exports.createJointAccount = async (req, res) => {
    try{
    const {accountNumber, accountName, users} = req.body;

    const uniqueUsers = [...new Set(users)]
    if (uniqueUsers.length < users.length) {
        return res.status(400).json({error: 'Dupilcate user IDs are not allowed.'})
    }
    const userExists = await User.findAll(users)
    if (!userExists || userExists.length !== users.length) {
        return res.status(400).json({message: 'One or more users do not exist'});
    }
    const jointAccount = await JointAccount.create({
        accountName,
        accountNumber
    })

    if (users && Array.isArray(users)){
        await jointAccount.setUsers(users)
    }

    return res.status(201).json({message: 'Joint account created', jointAccount})
    }catch(error){
        console.error(error)
        res.status(500).json({message: error.message})
    }
}

exports.getAllJointAccounts = async (req, res) => {
    try{
        const jointAccounts = await JointAccount.findAll({
            include: [
                {
                    model: User, attributes:['id', 'firstname' , 'lastname'],
                    through: {attributes: []}
                }
            ]
        })
        res.status(200).json(jointAccounts)
    }catch (error){
        res.status(500).json({error: 'Failed to fetch accounts'})
    }
}

exports.getJointAccountById = async (req, res) => {
    try{
        const {id} = req.params
        const account = await JointAccount.findByPk(id,{
            include: [
                {
                    model: User, attributes:['id', 'firstname' , 'lastname'],
                    through: {attributes: []}
                }
            ]
        })
        if (!account) return res.status(404).json({error: 'JointAccount not found'})
        
        res.status(200).json(account)
    }catch(error){
        res.status(500).json({error: 'Request Failed'})
    }
}

exports.addUsersToJointAccount = async (req, res) => {
    try{
        const {id} = req.params;
        const { users} = req.body;

        const jointAccount = await JointAccount.findByPk(id);
        if (!jointAccount) return res.status(404).json ({error: 'JointAccount not found'})
        
        //Remove duplicates
        const newUsers = [...new Set (users)]

        const currentUsers = await jointAccount.getUsers()
        const existingUsers = currentUsers.map(users => users.id)
        const filteredIds = newUsers.filter(id => !existingUsers.includes(id))

        if(filteredIds.length === 0) {
            return res.status(400).json ({error: 'No new users to add'})
        }

        const usersToAdd = await User.findAll({where: {id: filteredIds}})
        await jointAccount.addUsers(usersToAdd)
        res.status(200).json({message: 'Users added succeccfully'})
    }catch(error){
        console.error(error)
        res.status(500).json({error: 'Failed to add new Users'})
    }
}

exports.deleteJointAccount = async (req, res) => {
    try{
        const jointAccount = await JointAccount.findByPk(id)
        if(!jointAccount) return res.status(404).json({error: 'Account not found'})
        
        await jointAccount.destroy()

        res.status(200).json({message: 'JointAccount deleted successfully'})
        
    }catch(error){
        res.status(500).json({error: 'Failed to delete account'})
    }
}

exports.removeUserFromJointAccount = async (req, res) => {
    try{
        const {id} = req.params;
        const {users} = req.body;
        const jointAccount = await JointAccount.findByPk(id);
        if (!jointAccount) return res.status(404).json ({error: 'JointAccount not found'})
        if (!Array.isArray(users) || users.length === 0) {
            return res.status(400).json({error: 'Users must be an array and cannot be empty'});
        }
        const user = await User.findAll({ where: { id: users } });
        if (!user) return res.status(404).json({error: 'User not found'})

        await jointAccount.removeUser(users)
        res.status(200).json({message: 'User removed successfully'})
    }catch(error){
        console.error(error)
        res.status(500).json({error: 'Failed to remove user'})
    }
}
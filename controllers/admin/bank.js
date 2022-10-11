const Bank = require('../../models/bank')
const fs = require('fs-extra')
const path = require('path')

module.exports = {
    addBank: async (req, res) => {
        try{
            const {nameBank, noRek, name} = req.body
            await Bank.create({
                nameBank,
                noRek,
                name
            })
            res.status(201).json({message: 'succes create collection bank'})
        } catch(error) {
            res.status(401).json({message: error})
        }
    },
    getAllbank: async(req, res) => {
        try {
            const banks = await Bank.find()
            res.status(200).json({banks})
        } catch (error) {
            res.status(404).json({message: error})
        }
    },

    updateBank: async (req, res) => {
       try {
        const{id, nameBank, noRek, name} = req.body
            const findBank = await Bank.findOne({_id: id})
            if(req.file === undefined){
                findBank.nameBank = nameBank
                findBank.noRek = noRek
                findBank.name = name
                await findBank.save()
            } else {
                await fs.unlink(path.join(`public/${findBank.imageUrl}`))
                findBank.nameBank = nameBank
                findBank.norek = noRek
                findBank.name = name
                await findBank.save()
            }
            res.status(201).json(findBank)
       } catch (error) {
            res.status(401).json(error)
       }
    },

    deleteBank: async (req, res) => {
        try {
            const {id} = req.params
            const bank = await Bank.findOne({_id: id})
            await fs.unlink(path.join(`public/${bank.imageUrl}`))
            await bank.remove()
            res.status(200).json({message: 'success delet bank'})
        } catch (error) {
            res.status(404).json({message: error})
        }
    }
}
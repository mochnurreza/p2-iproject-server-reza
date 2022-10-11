const Category = require('../../models/category')

module.exports = {
    addCategory : async (req, res) => {
        try {
            const{name} = req.body
            const category = new Category({name})
            await category.save()
            res.status(201).json(category)
        } catch (error) {
            res.status(400).json(error)
        }
    },

      getCategory: async (req, res) => {
        try {
            const categories = await Category.find()
            console.log(categories)
            res.status(200).json({categories})
        } catch (error) {
            res.status(404).json(error.message)
        }
    },

     editCategory: async (req, res) => {
        try {
            const {id} = req.params
            const {name} = req.body
            const find = await Category.findOne({_id: id})
            
            if(name){
                find.name = name
            }

            await find.save()
            res.status(201).json({message: `data with name ${find.name} has been updated`})
        } catch (error) {
            res.status(401).json(error.message)
        }
    },

     deleteCategory: async (req, res) => {
        try {
            const {id} = req.params
            const category = await Category.findOne({_id: id})
            await category.remove()
            res.status(200).json({message: 'success delete'})
        } catch (error) {
            res.status(400).json(error.message)
        }
    }
}
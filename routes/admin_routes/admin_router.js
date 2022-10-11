const router = require('express').Router()
const Category = require('../../controllers/admin/category')
const Bank = require('../../controllers/admin/bank')
const User = require('../../controllers/admin/user')
const Item = require('../../controllers/admin/item')
const {upload, uploadMultiple} = require('../../middleware/multer')


// user router
router.post('/login', User.actionSignin)
router.post('/register', User.actionRegister)

// category router
router.get('/categories', Category.getCategory)
router.post('/categories', Category.addCategory)
router.put('/categories/:id', Category.editCategory)
router.delete('/categories/:id', Category.deleteCategory)

// bank router
router.post('/banks', upload, Bank.addBank)
router.get('/banks', Bank.getAllbank)
router.put('/banks/:id', Bank.updateBank)
router.delete('/banks/:id', Bank.deleteBank)

// item router
router.post('/item', uploadMultiple, Item.addItem)
router.get('/item/show-image/:id', Item.showImageItem)
router.get('/item/:id', Item.showEditItem)
router.put('/item/:id', Item.editItem)
router.delete('/item/:id', Item.deleteItem)

module.exports = router
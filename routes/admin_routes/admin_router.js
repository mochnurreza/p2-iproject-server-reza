const router = require('express').Router()
const Category = require('../../controllers/admin/category')
const Bank = require('../../controllers/admin/bank')
const {upload} = require('../../middleware/multer')


router.get('/categories', Category.getCategory)
router.post('/categories', Category.addCategory)
router.put('/categories/:id', Category.editCategory)
router.delete('/categories/:id', Category.deleteCategory)

// bank router
router.post('/banks', upload, Bank.addBank)
router.get('/banks', Bank.getAllbank)
router.put('/banks/:id', Bank.updateBank)
router.delete('/banks/:id', Bank.deleteBank)

module.exports = router
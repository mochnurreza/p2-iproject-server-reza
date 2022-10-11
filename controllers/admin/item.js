const Item = require("../../models/item");
const Category = require("../../models/category");
const Image = require('../../models/image')
const Feature = require('../../models/feature')
const activity = require('../../moelds/activity')

module.exports = {
  addItem: async (req, res) => {
    try {
      const { categoryId, title, price, city, about } = req.body;
      if (req.files.length > 0) {
        const category = await Category.findOne({ _id: categoryId });
        const newItem = {
          categoryId,
          title,
          description: about,
          price,
          city,
          about,
        };
        const item = await Item.create(newItem)
        category.itemId.push({_id:item._id})
        await category.save()
        for(let i = 0; i < req.files.length; i++){
            const imageSave = await Image.create({imageUrl: `images/${req.files[i].filename}`})
            item.imageId.push({_id: imagaeSave._id})
            await Item.save()
        }
      }
      res.status(201).json({message: 'item has been created'})
    } catch (error) {
        res.status(401).json(error)
    }
  },

  showImageItem: async (req, res) => {
    try {
        const {id} = req.params
        const item = await Item.findOne({
            _id: id
        })
        .populate({path : 'imageId', select: 'id imageUrl'})
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json(error)
    }
  },

  showEditItem: async (req, res) => {
    try {
        const {id} = req.params
        const item = await Item.findOne({_id: id})
        .populate({path: 'imageId', select: 'id imageUrl'})
        .populate({path: 'categoryId', select: 'id name'})

        const category = await Category.find()
        res.status(201).json({message: 'item edited'})
    } catch (error) {
        res.status(400).json(error)
    }
  },

  editItem: async (req, res) => {
    try {
        
        const {id} = req.params
        const{categoryId, title, price, city, about} = req.body
        const item = await Item.findOne({_id: id})
        .populate({path: 'imageId', select: 'id imageUrl'})
        .populate({path: 'categoryId', select: 'id name'})
    
        if(req.files.length > 0){
            for (let i = 0; i < item.imageId.length; i++) {
                const imageUpdate = await Image.findOne({ _id: item.imageId[i]._id });
                await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`));
                imageUpdate.imageUrl = `images/${req.files[i].filename}`;
                await imageUpdate.save();
              }
            item.title = title;
            item.price = price;
            item.city = city;
            item.description = about;
            item.categoryId = categoryId;
            await item.save();
        } else {
            item.title = title;
            item.price = price;
            item.city = city;
            item.description = about;
            item.categoryId = categoryId;
            await item.save();
        }
        res.status(201).json({message: 'success update item'})
    } catch (error) {
        res.status(400).json(error)
    }
  },

  deleteItem: async (req, res) => {
    try {
        const {id} = req.params
        const item = await Item.findOne({_id: id}).populate('imageId')
        for(let i = 0; i < item.imageId.length; i++){
            Image.findOne({_id: item.imageId[i]._id})
            .then(image => {
                fs.unling(path.join(`public/${image.imageUrl}`))
                image.renove()
            }).catch(err => {
                console.log(err)
            })
        }
        await item.remove()
        res.status(200).json({message:'success delete item'})
    } catch (error) {
        res.status(400).json(error)
    }
  },

  detailItem: async (req, res) => {
    const {itemId} = req. params
    try{
        const feature = await Feature.find({itemId: itemId})
        const activity = await Activity.find({itemId: itemId})
        res.status(200).json({feature, activity})
    } catch(error){
      res.status(400).json(error)
    }
  }
};

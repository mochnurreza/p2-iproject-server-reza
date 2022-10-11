const Feature = require('../../models/feature')
const Item = require('../../models/item')

module.exports = {
    addFeature: async (req, res) => {
        const {name, qty, itemId} = req.body
        try {
            if(!req.file){
                throw{name: 'image not found'}
            }
            const feature = await Feature.create({
                name,
                qty,
                itemId,
                imageUrl: `images/${re.file.filename}`
            })

            const item = await Item.findOne({_id : id})
            item.featureId.push({_id: featureId})
            item.save()
            res.status(201).json({message: 'success add feature'})
        } catch (error) {
            res.status(401).json(error)
        }
    },

    editFeature: async (req, res) => {
        const { id, name, qty, itemId } = req.body;
        try {
            const feature = await Feature.findOne({ _id: id });
            if(!req.file == undefined){
                feature.name = name
                feature.qty = qty
                await feature.save()
            } else {
                await fs.unlink(path.join(`public/${feature.imageUrl}`))
                feature.name = name
                feature.qty = qty
                feature.imageUrl = `images/${req.file.filename}`
                await feature.save()
            }
            res.status(201).json()
        } catch (error) {
            res.status(400).json(error)
        }
    },

    deleteFeature: async (req, res) => {
        const {id, itemId} = req.params
        try {
            const feature = await Feature.findOne({_id: id})
            const item = await Item.findOne({_id: itemId}).populate('featureId')
            for(let i = 0; i < item.featureId.length; i++){
                if(item.featureId[i]._id.toString() == feature._id.toString()){
                    item.featureId.pull({_id: feature._id})
                    await item.save()
                }
            }
            await fs.unlink(path.join(`public/${feature.imageUrl}`))
            await feature.remove()
            res.status(200).json({message: 'success delete feature'})
        } catch (error) {
            res.status(400).json(error)
        }
    }
}
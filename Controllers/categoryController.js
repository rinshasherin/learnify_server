const categories = require('../Models/categoryModel')


exports.getSingleCategory = async (req, res) => {
    try {
        const { title } = req.params
        const result = await categories.find({ title })
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.searchCategory = async (req, res) => {
    try {
        const keyword = req.query.search
        const result = await categories.find({ title: { $regex: keyword, $options: 'i' } })
        // console.log(result)
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}


// admin

exports.addCategory = async (req, res) => {
    try {
        const { title, description, photoUrl } = req.body
        const userId = req.payload
        if (!title || !description || !photoUrl) {
            res.status(406).json("Enter all inputs!!")
        }
        else {
            const existingCategory = await categories.findOne({ title })
            if (existingCategory) {
                res.status(406).json("Category already exists!!")
            }
            else {
                const newCategory = new categories({
                    title, description, photoUrl, userId
                })
                await newCategory.save()
                res.status(200).json(newCategory)
            }
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}


exports.getCategories = async (req, res) => {
    try {
        // const userId=req.payload                                       // ivde userid nte avishyam illathath ella admins num ore pole data kittan vendittan. suppose, userid koduthal aa particular user nu mathrame data kittuollu,[userid kodukkunnath find() nakath destructure cheythittan , like this .find({userid})] (same in getCourses)
        const categoryList = await categories.find()
        res.status(200).json(categoryList)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}


exports.deleteCategory = async (req, res) => {
    try {
        const { categoryid } = req.params
        const category = await categories.findByIdAndDelete(categoryid)
        res.status(200).json("Category deleted successfully")
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}


exports.updateCategory = async (req, res) => {
    try {
        const { categoryid } = req.params
        const userId = req.payload
        const { title, description, photoUrl } = req.body
        const update = await categories.findByIdAndUpdate(categoryid, { title, description, photoUrl })
        res.status(200).json(update)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}
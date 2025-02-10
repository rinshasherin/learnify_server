const courses = require('../Models/courseModel')


exports.getSingleCourse = async (req, res) => {
    try {
        const { title } = req.params
        const result = await courses.find({ title })
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.getSingleCourseById = async (req, res) => {
    try {
        const { courseid } = req.params
        const result = await courses.findById(courseid)
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.searchCourse = async (req, res) => {
    try {
        const keyword = req.query.search
        const result = await courses.find({ title: { $regex: keyword, $options: 'i' } })
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}


exports.getSameCourse = async (req, res) => {
    try {
        const { category } = req.query
        if (!category) {
            res.status(400).json(err)
        }
        const result = await courses.find({ category })
        if (result.length === 0) {
            return res.status(404).json({ message: "No courses found with that category" });
        }
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}


// admin

exports.addCourse = async (req, res) => {
    try {
        const { title, description, price, imageUrl, videoUrl, topics, part, category } = req.body
        const userId = req.payload
        const newCourse = new courses({
            title, description, price, imageUrl, videoUrl, topics, part, category, userId
        })
        await newCourse.save()
        res.status(200).json(newCourse)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}


exports.getCourses = async (req, res) => {
    try {
        // const userId=req.payload
        const courseList = await courses.find()
        res.status(200).json(courseList)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}


exports.deleteCourse = async (req, res) => {
    try {
        const { courseid } = req.params
        const course = await courses.findByIdAndDelete(courseid)
        res.status(200).json("course deleted successfully")
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}


exports.updateCourse = async (req, res) => {
    try {
        const { courseid } = req.params
        const userId = req.payload
        const { title, description, price, imageUrl, videoUrl, topics, part, category } = req.body
        const update = await courses.findByIdAndUpdate(courseid, { title, description, price, imageUrl, videoUrl, topics, part, category })
        res.status(200).json(update)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}
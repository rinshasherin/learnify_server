const reviews = require('../Models/reviewModel')

exports.addReview = async (req, res) => {
    try {
        const { name, email, message } = req.body
        const newReview = new reviews({ name, email, message })
        await newReview.save()
        res.status(200).json(newReview)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }

}


exports.getReviews = async (req, res) => {
    try {
        const reviewList = await reviews.find({ status: 'approved' })
        res.status(200).json(reviewList)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}


// admin


exports.getAllReviews = async (req, res) => {
    try {
        const reviewList = await reviews.find()
        res.status(200).json(reviewList)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}


exports.updateReviewStatus = async (req, res) => {
    try {
        const { reviewId } = req.params
        const status = req.query.status
        const review = await reviews.findById(reviewId)
        review.status = status
        await review.save()
        res.status(200).json(review)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}
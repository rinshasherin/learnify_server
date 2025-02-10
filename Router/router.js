const express = require('express')

const userController = require('../Controllers/userController')
const courseController = require('../Controllers/courseController')
const categoryController = require('../Controllers/categoryController')
const reviewController = require('../Controllers/reviewController')

const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerMiddleware = require('../Middlewares/multerMiddleware')

const router = express.Router()

router.post('/reg', userController.userRegistration)
router.post('/log', userController.userLogin)
router.put('/updateprofile', jwtMiddleware, multerMiddleware.single('profile'), userController.userProfile)

router.get('/getcategory', categoryController.getCategories)
router.get('/catbyname/:title', jwtMiddleware, categoryController.getSingleCategory)
router.get('/searchcategory', categoryController.searchCategory)

router.get('/getcourse', courseController.getCourses)
router.get('/coursebyname/:title', jwtMiddleware, courseController.getSingleCourse)
router.get('/coursebyid/:courseid', jwtMiddleware, courseController.getSingleCourseById)
router.get('/searchcourse', courseController.searchCourse)
router.get('/samecourse', courseController.getSameCourse)

router.post('/addreview', reviewController.addReview)
router.get('/getreviews', reviewController.getReviews)

// admin

router.get('/allusers', jwtMiddleware, userController.getAllUsers)

router.post('/addcourse', jwtMiddleware, courseController.addCourse)
router.get('/getcourses', jwtMiddleware, courseController.getCourses)
router.delete('/deletecourse/:courseid', jwtMiddleware, courseController.deleteCourse)
router.put('/updatecourse/:courseid', jwtMiddleware, courseController.updateCourse)

router.post('/addcategory', jwtMiddleware, categoryController.addCategory)
router.get('/getcategories', jwtMiddleware, categoryController.getCategories)
router.delete('/deletecategory/:categoryid', jwtMiddleware, categoryController.deleteCategory)
router.put('/updatecategory/:categoryid', jwtMiddleware, categoryController.updateCategory)

router.get('/getallreviews', jwtMiddleware, reviewController.getAllReviews)
router.get('/updatereview/:reviewId', jwtMiddleware, reviewController.updateReviewStatus)


module.exports = router

import express from 'express'
import { getAllToursController, getTourByIdController, createTourController, updateTourController, checkBody } from '../controllers/tour.controller.js'
const tourRouter = express.Router()
//A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.



tourRouter
    .route('/')
    .get(getAllToursController)
    .post(checkBody, createTourController)

tourRouter
    .route('/:id')
    .get(getTourByIdController)
    .put(updateTourController)

export { tourRouter }
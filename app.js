
import express from 'express'

import { tourRouter } from './routes/tour.routes.js'
import { userRouter } from './routes/user.routes.js'
import { tours } from './services/tour.service.js'
const app = express()


// 1) MIDDLEWARES 

app.use(express.json())
app.use(express.static(`${process.cwd()}/public`))

app.use(/\/.*\/tours(\/.*)?$/, (req, res, next) => {
    //console.log('Time:', new Date().toISOString())
    req.requestTime = new Date().toISOString();

    next();
}, (req, res, next) => {
    console.log('Request Type:', req.method)
    next()
});



// 3) ROUTES 

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter)


/* app.post('/api/v1/tours', (req, res) => {
    if (Object.keys(req.body).length > 0) {
        const newId = tours[tours.length - 1].id + 1;
        const newTour = { id: newId, ...req.body };
        tours.push(newTour);
        // writeDataToFile(tours);
        res.status(201).json({
            status: "success",
            data: { tour: newTour }
        });
    } else {
        res.status(400).json({
            status: "error",
            message: "No data transmitted"
        });
    }
}) */

export { app }

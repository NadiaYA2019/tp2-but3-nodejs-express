import { getAllTours, getTourById, createTour, updateTour } from '../services/tour.service.js';


const checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {

        return res.status(404).json({
            status: "final",
            message: "Missing name or price"
        })
    }
    next();
}

const checkID = (req, res, next, val) => {
    console.log(`Tour ID : ${val}`)
    const tours = getAllTours();
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid ID'
        })
    }
    next()
}

const getAllToursController = (req, res) => {
    const tours = getAllTours();
    //console.log(`${req.baseUrl}`)
    //console.log(`${req.get('USER-AGENT')}`)
    res.status(200).json({
        status: "success",
        requestedTime: req.requestTime,
        results: tours.length,
        data: { tours }
    });
}

const getTourByIdController = (req, res) => {
    const { id } = req.params;
    const tour = getTourById(+id);
    if (tour) {
        res.status(200).json({
            status: "success",
            data: { tour }
        });
    } else {
        res.status(404).json({
            status: "fail",
            message: "Resource not found on the server"
        });
    }
}

const createTourController = (req, res) => {
    if (Object.keys(req.body).length > 0) {
        const newTour = createTour(req.body);
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
}

const updateTourController = (req, res) => {
    const { id } = req.params;
    const success = updateTour(+id, req.body);
    if (success) {
        res.status(200).json({
            status: "success",
            message: "Tour updated successfully"
        });
    } else {
        res.status(404).json({
            status: "error",
            message: "Resource to update not found on the server"
        });
    }
}

export { checkID, getAllToursController, getTourByIdController, createTourController, updateTourController, checkBody };

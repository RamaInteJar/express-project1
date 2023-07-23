// Import required modules
const fs = require('fs');
const express = require('express');
const app = express();

// MIDDLEWARE: Used to parse incoming JSON data
app.use(express.json());

// Read tour data from JSON file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// Handler to get all tours
const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
};

// Handler to get a specific tour by ID
const getTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
};

// Handler to create a new tour
const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });
};

// Handler to update a tour by ID
const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here>'
        }
    });
};

// Handler to delete a tour by ID
const deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
};

// Define routes for different CRUD operations
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`App running on the port ${port}`);
});























































// const fs = require('fs')
// const express =require("express");
// const app = express()



// //CRUD OPERATIONS
// //MIDDLEWARE: the function that can modify an incoming requested data
// app.use(express.json())

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

// const  getAllTours = (req, res)=>{
//     res.status(200).json({
//         status: 'success',
//         results: tours.length, //when sending multiple objects
//         data: {
//             tours
//         }
//     })

// }

// const getTour = (req, res)=>{
//     console.log(req.params)

//     const id = req.params.id * 1;   //a js trick to convert a string of number into a number
//     const tour = tours.find(el => el.id === id)

//     // if(id > tours.length){
//         if(!tour){
//         return res.status(404).json({
//             status: 'fail',
//             message: "invalid ID"
//         })
//     }

//     res.status(200).json({
//         status: 'success',
//         results: tours.length, //when sending multiple objects
//         data: {
//             tour
//         }
//     })

// }

// const createTour =(req, res)=>{
//     // console.log(req.body);
//     const newId = tours[tours.length - 1].id + 1;
//     const newTour = Object.assign({id: newId}, req.body)
//     tours.push(newTour)

//     fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json}`, JSON.stringify(tours), err=>{
//         res.status(201).json({
//             status: "sucess", 
//             data: {
//                 tour: newTour
//             } 
//         })
//     })
// }

// const updatTour =(req, res)=>{
//     if(req.params.id * 1 > tours.length){
//             return res.status(404).json({
//                 status: 'fail',
//                 message: "invalid ID"
//             })
//         }

//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour: '<Updated tour here>'
//         }
//     })
// }

// const deleteTour =(req, res)=>{
//     if(req.params.id * 1 > tours.length){
//             return res.status(404).json({
//                 status: 'fail',
//                 message: "invalid ID"
//             })
//         }

//     res.status(204).json({
//         status: 'success',
//         data: null,
        
//     })
// }

// // app.get('/api/v1/tours', getAllTours)  //GET ALL TOURS
// // app.post('/api/v1/tours', createTour)  //CREATE TOUR
// // app.get('/api/v1/tours/:id', getTour)  //GET A TOU
// // app.patch('/api/v1/tours/:id', updatTour) //UPDATE TOUR
// // app.delete('/api/v1/tours/:id', deleteTour) //DELETE TOUR


// app.route('/api/v1/tours').get(getAllTours).post(createTour)

// app.route('/api/v1/tours/:id').get(getTour).patch(updatTour).delete(deleteTour)


// const port = 3000;
// app.listen(port, ()=>{
//     console.log(`App running on the port ${port}`);
// })





// app.get('/', (req, res)=>{
//     // res.status(200).send('Hello from the server side')
//     res.status(200).json({"message":'Hello from the server side', "app": "Natours"})
// })

// app.post('/', (req, res)=>{
//  res.send('You can post to this endpoint...')
// })
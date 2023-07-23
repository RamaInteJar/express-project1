const fs = require('fs')
const express =require("express");
const app = express()


//MIDDLEWARE: the function that can modify an incoming requested data
app.use(express.json())

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get('/api/v1/tours', (req, res)=>{

    res.status(200).json({
        status: 'success',
        results: tours.length, //when sending multiple objects
        data: {
            tours
        }
    })

})

app.post('/api/v1/tours', (req, res)=>{
    // console.log(req.body);

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body)
    tours.push(newTour)

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json}`, JSON.stringify(tours), err=>{
        res.status(201).json({
            status: "sucess", 
            data: {
                tour: newTour
            } 
        })
    })
})

const port = 3000;
app.listen(port, ()=>{
    console.log(`App running on the port ${port}`);
})





// app.get('/', (req, res)=>{
//     // res.status(200).send('Hello from the server side')
//     res.status(200).json({"message":'Hello from the server side', "app": "Natours"})
// })

// app.post('/', (req, res)=>{
//  res.send('You can post to this endpoint...')
// })
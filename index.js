
let employees = require("./employees.json"); 

const express = require('express')
const bodyParser = require("body-parser"); 
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 3000

app.get('/employees', (request, response) => response.json(employees))

app.post('/employees', (request, response) => {
  let employee = {...request.body,id:employees.length + 1}
  employees.push(employee);
  response.status(201).json(employee);  
})

app.put('/employees', (request, response) => {
  let i = employees.findIndex(s=>s.id == request.body.id);
  if(i < 0){
    response.status(400).send(); 
    return; 
  }
  employees[i] = request.body; 
  response.status(200).json(request.body);  
})

app.delete('/employees/:id', (request, response) => {
  let i = employees.findIndex(s=>s.id == request.params.id);
  if(i < 0){
    response.status(400).send(); 
    return; 
  }
  employees = employees.filter(s => s.id != request.params.id); 
  response.status(200).send();  
})

app.listen(port, () => console.log(`employee Web Service - Started: Listening on port ${port}`))
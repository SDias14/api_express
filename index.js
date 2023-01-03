const express = require('express');
const server = express();

server.use(express.json());

let users = [
    {id:1 , name: 'samuel de azevedo dias', idade: 26, login: 'Ss22'},
    {id:2, name: 'Mayara Dias', idade: 23, login: 'mm24'},
    {id:3, name: 'Jonas cercano', idade: 45, login: 'jj33'}, 
    {id:4, name: 'maria de fatima', idade: 54, login: 'mf55'}
]

//requisição get para trazer todos os usuarios. 

server.get('/users', (req, res) => {
    
    const status = users ? 200 : 404;

    res.json(users);
});

server.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id == id);
    const status = user ? 200 : 404;

    return res.status(status).json(user);
    
});


server.post('/users', (req, res) => {
    const {name, idade, login} = req.body; 

    const id = users[users.length - 1 ].id + 1; 

    const newUser = {id, name, idade, login} 

    users.push(newUser)//empurrando o novo customer para o array de customer

    return res.status(201).json(newUser)//retornando o status e o json do newcustomer
});

server.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const {name, idade, login} = req.body;
  
    const index = users.findIndex(item => item.id === id);

    const status = index >= 0 ? 200 : 404;
  
    if (index >= 0) {
      users[index] = { id: parseInt(id), name, idade, login} 
    }
  
    return res.status(status).json(users[index]);
  });

  server.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(item => item.id === id);

    const status = index >= 0 ? 200 : 404;

    const msg = "excluido com sucesso"
  
    if (index >= 0) {
      users.splice(index,1)
    }

    return res.status(status).json(msg);




  })




server.listen(3000);
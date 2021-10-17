// This solution will concentrate on PERN  - Postgres, Express, React and Node
// Main purpose - connecting to postgres db and focusing on post,put,delete and all other functionality
// Full stack -


const express = require("express");
const app = express();

//CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const cors = require('cors');
const pool = require('./db');


// middleware 
app.use(cors());
// Any time building full stack app, need data from client side. only way is from red.body object. This will allow it.
app.use(express.json()); // req.body

// ROUTES //

// create a todo
app.post('/todos', async (req,res)=>{

    try {
        const { description } = req.body;
        console.log(description);

        // todo is the table and description is the column. 
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description]);

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get all todos
app.get('/todos', async (req,res)=>{

    try {
       // const { description } = req.body;
       // console.log(description);
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});


// get a todo

app.get("/todos/:id", async (req,res) =>{

    try {

        // my way

        // const current_id = req.params.id;
        // const sql = "SELECT * FROM todo WHERE todo_id = " + current_id;
        // const specificId = await pool.query(sql);
        // res.json(specificId.rows[0]);
        // console.log(req.params);

        // Better way:

        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);

        res.json(todo.rows[0]);

    } catch (err) {
        console.log(err.message);
    }
})

//update a todo

app.put("/todos/:id", async (req, res) =>{
    try {

        const {id} = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",
        [description,id]);

        res.json("Todo was updated!");

        
    } catch (err) {
        console.log(err);
    }
})


// delete a todo
app.delete('/todos/:id', async (req,res)=>{

    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",
        [id]);

        res.json('Todo was deleted man!');
    } catch (err) {
        console.error(err.message);
    }
});



app.listen(5000, ()=> {
    console.log('server has started on port 5000');
});



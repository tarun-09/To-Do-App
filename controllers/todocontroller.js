var bodyParser = require('body-parser')
var mongoose = require('mongoose')

//Connect to a DataBase
mongoose.connect(`mongodb+srv://test:test@todo.dthk5.mongodb.net/Todo?retryWrites=true&w=majority`,{useNewUrlParser: true})

//Create a Schema
var todoSchema = new mongoose.Schema({
    item: String
})

var Todo = mongoose.model('Todo', todoSchema)


// var data = [{item:'Brush my Teeth'}, {item:'Have Bath'}, {item:'Have breakfast'}, {item:'Attend Lectures'}, {item: 'Practice DSA with coding'}];
var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){

    app.get('/todo', function(req, res){
        Todo.find({},function(err, data){
            if(err) throw err
            res.render('todo',{todos: data})
        })
    })

    app.post('/todo', urlencodedParser, function(req, res){
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err
            res.json(data)
        })
    })

    app.delete('/todo/:item', function(req, res){
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        })
    })

}
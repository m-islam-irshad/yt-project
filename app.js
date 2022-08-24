const express = require('express');
const app = express();
const port = 8080;
require("./models/index")
var userCtrl = require('./controllers/userController')


app.get("/", (req, res)=>{
    res.send("Home Page");
})
app.get("/add", userCtrl.addUser);
app.get("/crud", userCtrl.crudOperation);
app.get("/query", userCtrl.queryData);
app.get("/finder", userCtrl.finderData);
app.get("/setter-getter", userCtrl.setterGetter);
app.get("/validation", userCtrl.validationCont);
app.get("/raw-query", userCtrl.rawQuery);
app.get("/oneToOne", userCtrl.oneToOne);
app.get("/belongsTo", userCtrl.belongsTo);
app.get("/oneToMany", userCtrl.oneToMany);
app.get("/manyToMany", userCtrl.manyToMany);
app.get("/scopes", userCtrl.scopes);
app.get("/dataupdate", userCtrl.dataUpdate);
app.get("/polymorphic", userCtrl.polymorphic);
app.get("/polymorphic-many", userCtrl.polymorphicMany);



    



app.listen(port, ()=>{
    console.log("App is listening at"+port);
})


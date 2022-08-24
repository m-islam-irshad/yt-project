

const { Sequelize, QueryTypes } = require('../models');
var db = require('../models');
// const {Sequelize, QueryTypes } = require('sequelize');
const Users = db.sequelize.models.users;
const Posts = db.sequelize.models.posts;
const Tags = db.sequelize.models.tags;
const Post_tag = db.sequelize.models.post_tag;
const Image = db.sequelize.models.image;
const Video = db.sequelize.models.video;
const Comment = db.sequelize.models.comment;
const Tag_taggable = db.sequelize.models.tag_taggable;
// const Posts = db.posts;  
// const {Sequelize} = require('sequelize');
var addUser = async (req, res)=> {

    // let data = await Users.build({
    //     name:'Test',
    //     email: 'pakistan@gmail.com',
    // })
    // await data.save();


    // Another method 
    let data = await Users.create( { name:"Muhammad Hamza", email: "ameer.hamza@invozon.com"} );
    //update
    // data.name = "dommy";
    // data.save();
    
    //delete
    // data.destroy();
    

    //reload // ya change hoi value ko chor da ga jo last ki value ho g us ko la ly ga
    // data.name = 'dummy';
    // data.reload()

    console.log(data.dataValue); 

    let response={
        data: 'ok'
    }

    res.status(200).json(response);

}







//crud operation

var crudOperation = async (req, res)=>{
    //insert
    // let data = await Users.create( { name:"demo33", email: "demo133@gmail.com", gender:"male"} );

    //update 
    // let data = await Users.update({name:"final"}, {
    //     where:{
    //         id:2
    //     }
    // });


    //delete
    // let data = await Users.destroy({
    //     where:{
    //         id:3
    //     }
    // })

    // truncate whole table
    // let data = await Users.destroy({
    //     truncate:true
    // })
 

    // bulk insert
    // let data = await Users.bulkCreate([{name:'first', email:"first@hotmail.com", gender:"male"},{name:'first', email:"first@hotmail.com", gender:"male"},{name:'first', email:"first@hotmail.com", gender:"male"},{name:'first', email:"first@hotmail.com", gender:"male"},{name:'first', email:"first@hotmail.com", gender:"male"}])

    // find
    // let data = await Users.findAll({
    //     attributes:['name',
    //     ['email','emailID'],// yaline ya wala data to ly g hi pr us email ki attribute ko b change kr da g.
    //     'gender',
    //     [Sequelize.fn('CONCAT', Sequelize.col("email"), 'ID'), 'emailCount'] // ya function yha ps is lyiea lgayaha is ka pahla parameter is ki value count kry ga, 2sra ham btaty hyn kis ko count karna ha or 3sra wo variable jis main is ki value store karwani ha. //CONCAT kam kr rha ha count ni kr rha
    //     ]
    // });
    // let data = await Users.findOne({});


    //include // exclude

    // let data = await Users.findAll({
    //     // attributes:{exclude:['name']}
    //     attributes:{
    //         include:[[Sequelize.fn('CONCAT', Sequelize.col("name"), ' Khan'), 'FullName']]
    //     }
    // });



    //condition

    let data = await Users.findAll({
        where:{
            id:2
        }
    })


    let response = {
        data: data
    }
    res.status(200).json({response});
}







//fields: // matlab kon sa data insert karwana ha.
var queryData = async (req, res)=>{
    // let data = await Users.create( { name:"demo33", email: "demo133@gmail.com", gender:"male"}, {
    //     fields:['email', 'gender']
    // } );

    // let response = {
    //     data: data
    // }
    // res.status(200).json({response});
}




var finderData = async (req, res)=>{
    // let data = await Users.findByPk(15)
    // let data = await Users.findAndCountAll({
    //     where:{
    //         email:'first@hotmail.com'
    //     }
    // })
    // let [data, created] = await Users.findOrCreate({
    //     where:{
    //         name:'first'},
    //         defaults:{
    //             email:"dummy@gmail.com",
    //             gender:"male"
    //         }
    // })
    let response = {
            data: data,
            add:created
        }
        res.status(200).json({response});
}



//Setter Getter


var setterGetter = async (req, res)=>{
    // let data = await Users.create( { name:"Muhammad ", email: "muhammad.islam"} );  // ya hm setter k lyiea use kryn gy
    // let data = await Users.findAll({}) // ya getter k lyiea
    // let response = {
    //     data: data
    // }
    // res.status(200).json({response});
}


//validation

// jha pa hm ny apna model create kya ha wha pa hm ny validation ki ha k hamara data kasy enter ho ga


var validationCont = async (req, res)=>{
    try{
        let data = await Users.create({name: "Muhammad Islam", email:"done3@gmail.com", gender:"males"});
    }
    catch(e){
        const messages = {};
        e.errors.forEach((error) => {
            let message;
            switch(error.validatorKey){
                case "not_unique":
                    message = "Duplicate Email";
                    break;
                case "isIn":
                    message = error.message;
                    break;
                case "equals":
                    message = error.message;
                    break;
            }
            messages[error.path]=message;
            console.log(messages)
        });
    }
    
    let response = {
        data: 'ok'
    }
    res.status(200).json({response});
}










var rawQuery = async (req, res)=>{


    const users = await db.sequelize.query("select * from users", {
        type: db.sequelize.QueryTypes.SELECT
    });


    let response = {
        data:"Raw Query",
        record: users
    }
    res.status(200).json(response);
}





var oneToOne = async(req, res)=>{

    // let data = await Posts.bulkCreate([{name:'News Bikerider', title:"Biker", content:"biker detail", user_id:"1"},{name:'News Car', title:"Bike", content:"bike detail", user_id:"6"},{name:'News Truck', title:"Bike", content:"bike detail", user_id:"7"},{name:'News Bus', title:"Bike", content:"bike detail", user_id:"8"},{name:'News Cyber', title:"Bike", content:"bike detail", user_id:"9"}])

let data = await Users.findAll({
    attributes:['name','email'], //ya line hamyn attribute bty g kon kon c lani hyn 
//    include:Posts,
// another method
    include:[{model:Posts,
        as:'postDetail', 
        attributes:['title', ['name', 'PostName']]}],
    where:{
    id:1
   }
});

res.status(200).json(data);

}





var belongsTo = async (req, res)=>{


    let data = await Posts.findAll({
       attributes:['content', 'title'],
        include:[{
        model:Users,
        as:"userInfo",
        attributes:['name','email']
       }]
    });
    
    res.status(200).json(data);




}





var oneToMany = async (req, res)=>{

    let data = await Users.findAll({
        attributes:['name','email'],
        include:[{model:Posts,
            as:'postDetails', 
            attributes:['title', ['name', 'PostName']]}],
        where:{
        id:1
       }
    });
    
    res.status(200).json(data);


}


var manyToMany = async (req, res)=>{

    // let data = await Tags.bulkCreate([{name:'Latest'},{name:'Popular'},{name:'Sports'}])

    // let data = await Post_tag.bulkCreate([{postId: 1, tagId: 1},{postId: 1, tagId: 2},{postId: 2, tagId: 3}])

    // let data = await Post_tag.create({postId: 2, tagId: 2})

    // let data = await Posts.findAll({
    //     include:[{
    //         model: Tags
    //     }]
        
    // });
    let data = await Tags.findAll({
        include:[{
            model: Posts
        }]
        
    });
    
    res.status(200).json(data);


}  


// scoping
// in index file it's defined

var scopes = async (req, res)=>{
    // let data = await Users.scope(['checkGender', 'checkMail']).findAll({})
    

    //agar scoping relaton waly table pa krni ho to
    // let data = await Posts.findAll({
    //     include:[{
    //         model:Users,
    //         as:"userInfo"
    //     }]
    // })
    
    let data = await Users.scope(['includePost','selectUsers', 'limitCheck']).findAll({})


    res.status(200).json(data);
}
  





var dataUpdate = async (req, res)=>{

    // let data = await Image.bulkCreate([{title:'profile_pic', url:"profile1.jpg"},{title:"gallery_pic", url:"gallery.jpg"}])

    // let data = await Video.bulkCreate([{title:'movie', text:"hollywood"},{title:"comedy", url:"lollywood"}])
  
    // let data = await Comment.bulkCreate([{title:'Awesome', commentableId:2, commentableType:"image"},{title:"Bad movie", commentableId:1, commentableType:'video'}])
    
    let data = await Tag_taggable.create({tagId:3, taggableId:1, taggableType:"image"})
    
    // let data = await Tag_taggable.destroy({})
    
    res.status(200).json(data);


}  


 


var polymorphic = async (req, res)=>{
    //image to comment
    // let data = await Image.findAll({
    //     include:[{
    //         model:Comment
    //     }]
    // })
    
    //video to comment
    // let data = await Video.findAll({
    //     include:[{
    //         model:Comment
    //     }]
    // })
    
    //comment to video/Image .../
    let data = await Comment.findAll({
        include:[Image]
    })
   
    
    res.status(200).json(data);


} 


var polymorphicMany = async (req, res)=>{
    //....images to tag
    // let data = await Image.findAll({
    //     include:[{
    //         model:Tags
    //     }]
        
    // })


    //.....video to tag 
    // let data = await Video.findAll({
    //     include:[{
    //         model:Tags
    //     }]
        
    // })
   
    // ......... Tag to video
    let data = await Tags.findAll({
        include:[Video, Image]
    })
    
    res.status(200).json(data);


}  










module.exports = {
    addUser,
    crudOperation,
    queryData,
    finderData,
    setterGetter,
    validationCont,
    rawQuery,
    oneToOne,
    belongsTo,
    oneToMany,
    manyToMany,
    scopes,
    dataUpdate,
    polymorphic,
    polymorphicMany

}  
const {Sequelize, DataTypes} = require('sequelize');
//pahly database name ay ga phr user ka name phr Password
const sequelize = new Sequelize('invozone', 'postgres', 'PakistaN', {
    host: "localhost",
    dialect: 'postgres',
    logging: true   //agr is ko agr true kr dyn gy to ya hamyn sql provide kry ga.

})

sequelize.authenticate()
.then(()=>{
    console.log('connected')
})
.catch((err)=>{
    console.log("Error"+err)
});

const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
};

//jasy he main sync kron ga to mara table bn jy ga.
//is k andar 1 parameter hota ha, agr usy pass kron ga to wo forcefully pahly table ko delete kr da ta or new table bna da ga {force:true} or agr asy main flase kron ga to wo asy ni kry ga.
db.sequelize.sync({force:false})
.then(()=>{
    console.log("Yes re-sync");
})



db.users = require('./users')(sequelize, DataTypes);
db.posts = require('./posts')(sequelize, DataTypes);

db.tags = require('./tags')(sequelize, DataTypes);
db.post_tag = require('./post_tag')(sequelize, DataTypes);


//  scope

db.sequelize.models.users.addScope('checkGender',{
    where:{
        gender:'male'
    }
});
db.sequelize.models.users.addScope('checkMail',{
    where:{
        email: "done@invozone.com"
    }
});
db.sequelize.models.users.addScope('includePost',{
    include:{
        model: db.posts,
        as:"postDetails",
        attributes:['title','content']
        
    }
});
db.sequelize.models.users.addScope('selectUsers',{
        attributes:['name','email']
});
db.sequelize.models.users.addScope('limitCheck',{
        limit:2
});


// console.log(db.sequelize.models.posts  , '@db.users')
//one to one relation
db.sequelize.models.users.hasOne(db.sequelize.models.posts, {foreignKey:"user_id", as: 'postDetail'}); // 2nd parameter:ya by default userid // 1st:parameter yaline user ka post sy relation bn rhi ha// 3rd: parameter is aalias
//one to many relation
db.sequelize.models.users.hasMany(db.sequelize.models.posts, {foreignKey:"user_id", as: 'postDetails'}); // 2nd parameter:ya by default userid // 1st:parameter yaline user ka post sy relation bn rhi ha// 3rd: parameter is aalias
//one to one reverse relation
// is main hm ny bad main scoping b add ki ha.scope("type")
db.sequelize.models.posts.belongsTo(db.sequelize.models.users.scope('checkMail'), {foreignKey:'user_id', as: 'userInfo'});  // matlab ya bty g k post k pass user kon kon sa ha, to us ka relation idhar bnaya ha

// Many to Many

db.sequelize.models.posts.belongsToMany(db.sequelize.models.tags, {through:'post_tag'}); // is main pahla parameter hamyn btata ha kis k sath relation bnana ha or 2nd parameter btata ha kiss k through banna ha, 


// many to many reverse relation

db.sequelize.models.tags.belongsToMany(db.sequelize.models.posts, {through:'post_tag'})




/////............Polymorphic Relations

db.image = require('./image')(sequelize, DataTypes);
db.video = require('./video')(sequelize, DataTypes);
db.comment = require('./comment')(sequelize, DataTypes);

// one to Many

db.sequelize.models.image.hasMany(db.sequelize.models.comment,{foreignKey:'commentableId',
constraints:false, // constraints false ka matlab ha is table ka 2 k sath relation ha to to isy false kya ha k ya abi 1 k stah he kam kry
scope:{
    commentableType:'image'
}})

db.sequelize.models.video.hasMany(db.sequelize.models.comment,{foreignKey:'commentableId',
constraints:false,
scope:{
    commentableType:'video'
}})

// reverse connection


db.sequelize.models.comment.belongsTo(db.sequelize.models.image,{foreignKey:'commentableId',
constraints:false,
})
db.sequelize.models.comment.belongsTo(db.sequelize.models.video,{foreignKey:'commentableId',
constraints:false,
})




// Many to Many Polymorphic Relation

// means 1 image k pass multiple tag ho sakty hyn
// like image: - tag 1,2,3,4
// or 1 video k pass multiple tag ho sakty hyn,
// like video - tag 1 2 3
// other hand 1 tag k pass different video b ho sakti hyn or different images b

db.tag_taggable = require('./tag_taggable')(sequelize, DataTypes);

///.... image to tag


db.sequelize.models.image.belongsToMany(db.sequelize.models.tags,{through:{
    model:db.tag_taggable,
    unique: false,
    scope:{
        taggableType:'image'
    }
}, foreignKey:'taggableId',
    constraints:false
})


///..... tag to Images

db.sequelize.models.tags.belongsToMany(db.sequelize.models.image,{through:{
    model:db.tag_taggable,
    unique: false,
    scope:{
        taggableType:'image'
    }
}, foreignKey:'tagId',
    constraints:false
})

//......video to tag

db.sequelize.models.video.belongsToMany(db.sequelize.models.tags,{through:{
    model:db.tag_taggable,
    unique: false,
    scope:{
        taggableType:'image'
    }
}, foreignKey:'taggableId',
    constraints:false
})


///..... tag to video

db.sequelize.models.tags.belongsToMany(db.sequelize.models.video,{through:{
    model:db.tag_taggable,
    unique: false,
    scope:{
        taggableType:'video'
    }
}, foreignKey:'tagId',
    constraints:false
})





module.exports = db;
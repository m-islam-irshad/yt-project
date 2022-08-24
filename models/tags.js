

module.exports = (sequelize, DataType)=>{
    const Tags = sequelize.define("tags",{
        name:DataType.STRING
    },{
        createdAt: 'create_at',
        updatedAt:"modified_at"
    });
    return Tags
}

module.exports = (sequelize, DataTypes)=>{
    const Image = sequelize.define("image",{
        title: DataTypes.STRING,
        url: DataTypes.STRING
    },{
        createdAt: 'create_at',
        updatedAt:"modified_at"
    });
    return Image
}
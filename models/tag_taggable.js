
module.exports = (sequelize, DataTypes)=>{
    const Tag_taggable = sequelize.define("tag_taggable",{
        tagId: {
            type: DataTypes.INTEGER,
            unique:'tt_unique_constraint'
        },
        taggableId:{
            type: DataTypes.INTEGER,
            unique:"tt_unique_constraint",
            reference: null
        },
        taggableType:{
            type: DataTypes.STRING,
            unique:"tt_unique_constraint"
        }
    },{
        createdAt:"create_at",
        updatedAt:'modified_at'
    })
        return Tag_taggable;
  
}
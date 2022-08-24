

module.exports = (sequelize,DataTypes)=>{
    //pahla parameter table ka name or 2sra attribute
    const Post_Tag = sequelize.define('post_tag', {
        postId: DataTypes.INTEGER,
        tagId: DataTypes.INTEGER,

    }, {timestamps: false});
    return Post_Tag
}


module.exports = (sequelize,DataTypes)=>{
    //pahly model ka name, or second ho ga us k parameters kya on gy
    const Users = sequelize.define("users",{
        name:{
            type:DataTypes.STRING,
            set(value){
                //set hm tb use karty hyn jb hm ny value send karni hoti ha us k sath koi value set kr k bhajty hyn
                this.setDataValue("name", value+ ' Khan')
            },
            get(){
                //geter hm tb use karty hyn jb database sy value get ki or us ko apny hisab sy set karty hyn
                return this.getDataValue('name')+ " Invozone";
            }
        },
        email: {
            type: DataTypes.STRING,
            // defaultValue: 'test@gmail.com',
            allowNull: false,
            unique:true,
            set(value){
                this.setDataValue('email',value+"@invozone.com")
            }
        },
        gender:{
            type: DataTypes.STRING,
            validate:{
                //agr hm koi conditin set karna chahyn to
                // ya line code add kryn gy equals wala
                equals:{
                    args: 'male',
                    msg: "Please enter Only Male"
                },
                isIn:{
                    args:[['male','female']], // pahla parameter btata ha kya conditon lgani ha
                    msg: "Please Select from male/Female"
                }
            }
        }
    }, 
    {
        // tableName: "userdata" // ya kry ga agr table ho ga to usy drop kr da ga agr ni ho ga to usy create kr da ga.
        //ya parameter ya kam karta ha jo hamry table main extra colum bn jaty hyn created name sy wo ni bny gy.
        timestamps:false // ya use hota ha 2no ko khtam karny k lyiea
        // createdAt:false,  // is sy createdAt wla column delete ho jy ga.
        // updatedAt:false  // is sy updatedAt: wala delete ho jy ga.
        // createdAt:'create_at' // name change krny k lyiea use hoti ha
    }
    );
} 
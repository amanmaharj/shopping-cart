var mongoose=require('mongoose')
var bcryptjs=require('bcryptjs')
var userSchema=new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})



userSchema.methods.encryptPassword=function(password){
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(5),null)
}

userSchema.methods.validPassword=function(password){
    return bcryptjs.compareSync(password,this.password)
}

const User=mongoose.model('User',userSchema)

module.exports=User
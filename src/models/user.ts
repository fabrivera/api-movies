import { model, models, Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt';
;


export interface IUser extends Document {
    email: string
    props: () => {}
}

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        uppercase: false
    },
    email: {
        type: String,
        trim: true,
        uppercase: false,
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    imgPath: String,
    loginAttempts: Number,
    
},{
    timestamps: true
})

UserSchema.pre('save', async function(next){
    if (!this.isModified('passwordHash')) return next()
    const saltRounds = 10
    this.passwordHash = await bcrypt.hash(this.passwordHash, saltRounds)
    next()
})

UserSchema.path('email').validate(async(email: string)=>{
    const emailcount = await models.User.countDocuments({email})
    return !emailcount
}, 'Email already exits')

UserSchema.methods.comparePassword = async function(password: string) {
    const comparePassword = await bcrypt.compare(password, this.passwordHash)

    let sendResults: {} = {autorization: comparePassword}
    
    if (!comparePassword) {
        this.loginAttempts < 3
            ? this.loginAttempts = this.loginAttempts + 1
            : sendResults = {
                ...sendResults, 
                useCaptcha: 'true'
            }
        this.save()
    } else {
        sendResults = {
            ...sendResults,
            id: this._id,
            name: `${this.lastname} ${this.firstname}`,
            username: this.username,
            imgPath: this.imgPath
        }
        this.loginAttempts = 0
        this.save()
    }

    return sendResults
}

export default model<IUser>('User', UserSchema)
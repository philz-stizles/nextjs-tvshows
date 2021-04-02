import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    since: { type: Date, default: Date.now }
}, { timestamps: true });

UserSchema.pre('save', function(next) {
    if(this.password && this.isModified('password')) {
        
    }

    next()
})

const User = mongoose.model('Users', UserSchema)

export default User
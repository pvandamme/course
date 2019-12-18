const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('../models/task')

// User schema

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid')
			}
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 7,
		trim: true,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('Password cannot contain "password"')
			}
		}
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Age must be a postive number')
			}
		}
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]
}, {
	timestamps: true
})

// Virtual property

userSchema.virtual('tasks', {
	ref: 'Task',
	localField: '_id',
	foreignField: 'owner'
})

// Instance method

userSchema.methods.generateAuthToken = async function () {
	const token = jwt.sign({ _id: this._id.toString() }, 'secret')

	this.tokens = this.tokens.concat({ token })
	await this.save()

	return token
}

userSchema.methods.toJSON = function () {
	const userObject = this.toObject()

	delete userObject.password
	delete userObject.tokens

	return userObject
}

// Model method

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email })

	if (!user) {
		throw new Error('Unable to login')
	}

	const pass = await bcrypt.compare(password, user.password)

	if (!pass) {
		throw new Error('Unable to login')
	}

	return user
}

// Middleware

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 8)
	}

	next()
})

userSchema.pre('remove', async function (next) {
	await Task.deleteMany({ owner: this._id })
	next()
})

const User = mongoose.model('User', userSchema)

// Export

module.exports = User
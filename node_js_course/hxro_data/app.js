const MongoClient = require('mongodb').MongoClient
const { getContestsSeries } = require('./utils/utils')

const id = 'e3397acf-42fd-4d12-b825-919566681c7f'
let contestId = []

const connectionURL = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(connectionURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

const updateDB = (data) => {
	const connection = client.connect()

	connection.then(() => {
		const db = client.db('HXRO')
		db.collection('contests_history').insertOne(data, (err) => {
			if (err) throw err
			else console.log('Pushed to DB !\n')
		})
	})
}

const getData = async () => {
	console.log('|| NEW ||\n')

	const date = new Date()
	const timer = 60 - date.getSeconds()

	console.log('Timer :', timer + 's\n')

	if (timer > 10 && timer < 40) {
		try {
			const data = await getContestsSeries(id)
			if (!contestId.includes(data.shortId)) {
				try {
					contestId.push(data.shortId)
					updateDB(data)
				} catch (e) {
					console.log(e)
				}
			} else {
				console.log('Already pushed !\n')
			}
		} catch (e) {
			console.log(e)
		}
	}
}

setInterval(() => {
	getData()
}, 3000)

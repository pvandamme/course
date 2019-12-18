const express = require('express')
const Task = require('../models/task')
const router = new express.Router
const auth = require('../middleware/auth')

// Create task

router.post('/tasks', auth, async (req, res) => {
	const task = new Task({
		...req.body,
		"owner": req.user._id
	})

	try {
		await task.save()
		res.status(201).send(task)
	} catch (e) {
		res.status(400).send(e)
	}
})

// Read tasks

router.get('/tasks', auth, async (req, res) => {
	const params = { 
		owner: req.user.id,
	}
	const sort = {}

	if (req.query.completed) {
		params.completed = req.query.completed === 'true'
	}
	if (req.query.sortBy) {
		const parts = req.query.sortBy.split(':')
		sort[parts[0]] = parseInt(parts[1])
	}

	try {
		const tasks = await Task.find(params)
			.limit(parseInt(req.query.limit))
			.skip(parseInt(req.query.skip))
			.sort(sort)
		res.send(tasks)
	} catch (e) {
		res.status(500).send()
	}
})

// Update task

router.patch('/tasks/:id', auth, async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['description', 'completed']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' })
	}

	try {
		const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

		if (!task) {
			return res.status(404).send()
		}

		updates.forEach((update) => task[update] = req.body[update])
		await task.save()
		res.send(task)
	} catch (e) {
		res.status(400).send(e)
	}
})

// Delete task

router.delete('/tasks/:id', auth, async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

		if (!task) {
			return res.status(404).send()
		}

		res.send(task)
	} catch (err) {
		res.status(500).send()
	}
})

// Export

module.exports = router
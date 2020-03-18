const rp = require('request-promise')

const options = {
	json: true,
	headers: {
		'Ocp-Apim-Subscription-Key': '31fe32e10514454cbbba67572aa68845'
	}
}

const getContestId = async () => {
	const uri =
		'https://prod-hxro-api.azure-api.net/hxroapi/api/ContestSeries/running'
	try {
		const res = await rp({ ...options, uri })
		return res[6].id
	} catch (e) {
		console.log(e)
	}
}

const getContestsSeries = async (id) => {
	const uri =
		'https://prod-hxro-api.azure-api.net/hxroapi/api/Contests/by-series/' +
		id
	try {
		const res = await rp({ ...options, uri })

		if (!res[res.length - 2].instrumentPrices[0].livePrice) {
			throw new Error('An error occur : livePrice null')
		}

		const contest = res[res.length - 2]
		const data = {
			shortId: contest.shortId,
			length: res.length
		}
		console.log(data, '\n')
		return { ...contest, length: res.length }
	} catch (e) {
		console.log(e)
	}
}

const getTimer = async () => {
	const timer = await rp({
		uri:
			'https://prod-hxro-api.azure-api.net/hxroapi/api/Contests/time-until-contest-event',
		json: true,
		headers: {
			'Ocp-Apim-Subscription-Key': '31fe32e10514454cbbba67572aa68845'
		}
	})
	return (timer / 1000) | 0
}

module.exports = {
	getContestId,
	getContestsSeries,
	getTimer
}

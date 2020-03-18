const timer = async () => {
	if (res < 10000 && flag === false) {
		run()
		console.log('run')
		flag = true
	}
	if (res > 40000 && flag === true) {
		console.log('reset')
		flag = false
	}
	timer()
}

class myPromise {
	constructor(callBackFn) {
		const STATUS_MAP = {
			pendding: 'pendding',
			success: 'success',
			error: 'error'
		}
		this.status = STATUS_MAP.pendding
		this.value = undefined
		this.err = undefined
		this.onFullFn = []
		this.onErrFn = []
		const resolve = (value) => {
			if (this.status === STATUS_MAP.pendding) {
				this.status = STATUS_MAP.success
				this.value = value
				this.onFullFn.forEach(fn => fn())
			}
		}
		const reject = (err) => {
			if (this.status === STATUS_MAP.pendding) {
				this.status = STATUS_MAP.error
				this.err = err
				this.onErrFn.forEach(fn => fn())
			}
		}

		try {
			callBackFn(resolve, reject)
		} catch (error) {
			reject(error)
		}
	}

	then(onFull, onError) {
		setTimeout(() => {
			if (this.status === STATUS_MAP.success) {
				onFull(this.value)
			} else if (this.status === STATUS_MAP.error) {
				onError(this.err)
			} else {
				this.onFullFn.push(onFull)
				this.onFullFn.push(onError)
			}
		})

	}
}

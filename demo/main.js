

// CHANGE MASTER TO 
//   MASTER_HOST='1.116.139.149',
//   MASTER_USER='repl_user',
//   MASTER_PASSWORD='qwer8748',
//   MASTER_LOG_FILE='mysql-bin',
//   MASTER_LOG_POS=1;

const gCtxList = [];
const gPageList = [];
const gPageContainer = $('.ce-page-container')
const gWidth = 794;
const gHeight = 900;
const gdiff = 10
const gCache = {
	start: 0,
	end: 0,
	cacheEnd: 0,
	size: 0,
}

const imageFileDom = document.querySelector('#image')

let gInputing = false
let gEventPos = {}
let gCursorDom = null
let gAgentCursorDom = null
let gCurCtx = null
let gElementList = [];


function _initPageContext(ctx) {
	const dpr = window.devicePixelRatio
	ctx.scale(dpr, dpr)
	// 重置以下属性是因部分浏览器(chrome)会应用css样式
	ctx.letterSpacing = '0px'
	ctx.wordSpacing = '0px'
	ctx.direction = 'ltr'
}

function _createPage(pageNo = 0) {
	const canvas = document.createElement('canvas')
	canvas.style.width = `${gWidth}px`
	canvas.style.height = `${gHeight}px`
	canvas.style.display = 'block'
	canvas.style.backgroundColor = '#ffffff'
	// canvas.style.marginBottom = `${this.getPageGap()}px`
	canvas.setAttribute('data-index', String(pageNo))
	gPageContainer.append(canvas)
	// 调整分辨率
	const dpr = window.devicePixelRatio
	canvas.width = gWidth * dpr
	canvas.height = gHeight * dpr
	canvas.style.cursor = 'text'
	const ctx = canvas.getContext('2d')
	// 初始化上下文配置
	_initPageContext(ctx)
	// 缓存上下文
	gPageList.push(canvas)
	gCtxList.push(ctx)
	gCurCtx = ctx;
}

function _render() {
	gCurCtx.clearRect(0, 0, gWidth, gHeight)
	const len = gElementList.length;
	for (let i = 0; i < len; i++) {
		const elm = gElementList[i]
		const { type, value, size, style: font, x, y, width } = elm
		gCurCtx.save()
		if (type === 'text') {
			gCurCtx.fillStyle = '#000'
			gCurCtx.font = `${size * 1}px ${font}`
			// const { width } = gCurCtx.measureText(value)
			// console.log('width===', width)
			gCursorDom.style.left = `${x + width + gdiff}px`;
			gAgentCursorDom.style.left = `${x + width + gdiff}px`;
			gCurCtx.fillText(value, x, y)
		}
		gCurCtx.restore()
	}
}

function getPosition(offsetX, offsetY) {
	if (gElementList.length === 0) return { offsetX, offsetY }
	return { offsetX, offsetY }
}

function _canvasEvent() {
	gPageContainer.on('mousedown', (event) => {
		const { offsetX: eventOffsetX, offsetY: eventoffsetY } = event;
		console.log('mousedown===', event, eventOffsetX, eventoffsetY)
		const { offsetX, offsetY } = getPosition(eventOffsetX, eventoffsetY)
		gEventPos = {
			offsetX, offsetY
		}
		rmCursor();
		rmAgentCursor();
		drawCursor(offsetX, offsetY);
		drawCursorAgent(offsetX, offsetY)
		setTimeout(() => {
			gAgentCursorDom.focus()
			// agentCursorDom.setSelectionRange(0, 0)
		}, 100)
	})

	imageFileDom.onchange = function () {
		const file = imageFileDom.files[0]
		console.log('图片选择', file)
		const fileReader = new FileReader()
		fileReader.readAsDataURL(file)
		fileReader.onload = function () {
			// 计算宽高
			const image = new Image()
			const value = fileReader.result
			image.src = value
			image.onload = function () {
				console.log('value====', image)
				const imgData = {
					value,
					width: image.width,
					height: image.height,
				}
				gCurCtx.drawImage(image, 10, 10);
				imageFileDom.value = ''
			}
		}
	}
}

function drawCursor(cursorLeft, cursorTop) {
	if (!gCursorDom) {
		gCursorDom = document.createElement('div')
		gCursorDom.classList.add('ce-cursor')
		gPageContainer.append(gCursorDom)
	} else {
		gCursorDom.style.display = 'block'
	}
	gCursorDom.style.left = `${cursorLeft}px`;
	gCursorDom.style.top = `${cursorTop}px`;
	gCursorDom.classList.add('ce-cursor--animation')
}

function rmCursor() {
	if (gCursorDom) {
		gCursorDom.style.display = 'none'
		gCursorDom.classList.remove('ce-cursor--animation')
	}
}


function drawCursorAgent(cursorLeft, cursorTop) {
	// 代理光标绘制
	if (!gAgentCursorDom) {
		gAgentCursorDom = document.createElement('textarea')
		gAgentCursorDom.autocomplete = 'off'
		gAgentCursorDom.classList.add('ce-inputarea')
		gAgentCursorDom.oninput = debounce(_input.bind(), 0)
		gAgentCursorDom.addEventListener('compositionstart', (e) => {
			console.log('compositionstart====', e, gEventPos)
			if (!gInputing) {
				gInputing = true
			}
		})
		gAgentCursorDom.addEventListener('compositionend', (e) => {
			console.log('compositionend====', e)
			gInputing = false
		})
	} else {
		gAgentCursorDom.style.display = 'block'
	}
	gAgentCursorDom.innerText = ''
	gPageContainer.append(gAgentCursorDom)
	gAgentCursorDom.style.left = `${cursorLeft}px`
	gAgentCursorDom.style.top = `${cursorTop}px`
}

function rmAgentCursor() {
	if (gAgentCursorDom) {
		gAgentCursorDom.style.display = 'none'
	}
}

function _input(e) {
	const { data } = e;
	const {
		offsetX, offsetY
	} = gEventPos
	let lastWidth = 0;
	const datas = splitText(data).map(text => {
		const obj = {
			type: 'text',
			value: text,
			size: 18,
			font: "bold 18px Yahei"
		}
		gCurCtx.fillStyle = '#000'
		gCurCtx.font = `${obj.size}px ${obj.font}`
		const { width } = gCurCtx.measureText(text)
		const box = {
			width,
			x: offsetX + lastWidth + gdiff,
			y: offsetY + obj.size,
			height: obj.size
		}
		lastWidth = lastWidth + width + gdiff
		// console.log('width===', text, width, lastWidth)
		return { ...obj, ...box }
	})
	const { start, cacheEnd, size } = gCache
	console.log('cacheEnd===', cacheEnd)
	if (start === 0 || start === size) gElementList.splice(start, cacheEnd, ...datas)
	gCache.cacheEnd = datas.length;
	console.log('_input ', gElementList)
	_render()
	if (!gInputing) {
		gCache.start = gElementList.length
		gCache.cacheEnd = 0
		gCache.size = gElementList.length
		const { x, width } = datas[datas.length - 1]
		gEventPos = {
			offsetX: x + width,
			offsetY,
		}
	}
}



function debounce(func, delay) {
	let timer
	return function (...args) {
		console.log('debounce====', args)
		if (timer) {
			window.clearTimeout(timer)
		}
		timer = window.setTimeout(() => {
			func(...args)
		}, delay)
	}
}

function splitText(text) {
	const data = []
	for (const t of text) {
		data.push(t)
	}
	return data
}


_createPage();


_canvasEvent();
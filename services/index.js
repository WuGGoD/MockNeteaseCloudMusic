const base = 'https://zyxcl.xyz/music/api'

export const request = (method, url,
	options = {}) => {
	const curCookie = uni.getStorageSync('curCookie') || ''
	const cookieData = curCookie ? {
		curCookie
	} : {};
	console.log(9999999999, {
		...options,
		...cookieData
	});
	uni.showLoading({
		title: '加载中',
		mask: true
	})
	return new Promise((resolve, reject) => {
		uni.request({
			method,
			url: base + url,
			data: {
				...options,
				...cookieData
			},
			success: res => {
				resolve(res.data)
				uni.hideLoading()
			},
			fail: e => {
				reject(e)
				uni.hideLoading
			}
		})
	})
}


//手机验证码登录
export const loginCellPhone = phone => request('get', `/captcha/sent?phone=${phone}`)
export const loginCaptCha = (phone, code) => request('get',
	`/captcha/verify?phone=${phone}&captcha=${code}`)

//邮箱登录
export const emailLogin = (email, password) => request('get', `/login?email=${email}&password=${password}`)

//二维码登录
export const qrKey = () => request('get', `/login/qr/key?timestamp=${Date.now()}`)
export const qrCreate = key => request('get', `/login/qr/create?timestamp=${Date.now()}&key=${key}&qrimg=qrimg`)
export const qrCheck = key => request('get', `/login/qr/check?key=${key}`)

//登录状态
export const loginStatus = () => request('get', `/login/status`)
export const getUserDetail = id => request('get', `/user/detail?uid=${id}`)

export const getBannerApi = () => request('post', 'http://121.89.213.194:5001/banner')

export const geiListApi = data => request('post', 'https://zyxcl.xyz/music/api//personalized', data)
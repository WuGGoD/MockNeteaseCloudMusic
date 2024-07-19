export const request = (method, url,
	options = {}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			method,
			url,
			...options,
			success: resolve,
			fail: reject
		})
	})
}

export const loginCellPhone = data => request('post', 'https://music.163.com/weapi/captcha/sent', data)

export const loginCaptCha = data => request('post', 'https://music.163.com/weapi/captcha/verify', data)

export const getBannerApi = () => request('post', 'https://zyxcl.xyz/music/api/banner')

export const getRankApi = () => request('get', 'https://zyxcl.xyz/music/api/toplist/detail')
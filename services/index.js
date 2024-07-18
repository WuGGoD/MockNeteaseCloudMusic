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
export const getListApi = data =>request ('post' ,'https://zyxcl.xyz/music/api//personalized' , data)

export const loginCellPhone = data => request('post', 'https://music.163.com/weapi/captcha/sent', data)

export const loginCaptCha = data => request('post', 'https://music.163.com/weapi/captcha/verify', data)

export const getBannerApi = () => request('post', 'http://121.89.213.194:5001/banner')

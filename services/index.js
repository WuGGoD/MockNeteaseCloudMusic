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
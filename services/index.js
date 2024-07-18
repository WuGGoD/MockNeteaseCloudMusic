
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
	
	export const getBannerApi = () => {
		return request('post', 'http://121.89.213.194:5001/banner')
	}


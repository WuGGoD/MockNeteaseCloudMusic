
	export const request = (url, options = {}) => {
		return new Promise((resolve, reject) => {
			uni.request({
				url,
				...options,
				success: resolve,
				fail: reject
			})
		})  
	}
	
	export const getBannerApi = () => {
		return request('http://121.89.213.194:5001/banner')
	}


const base = 'https://zyxcl.xyz/music/api'

export const request = (method, url,
	options = {}) => {
	uni.showLoading({
		title: '加载中',
		mask: true
	})
	return new Promise((resolve, reject) => {
		uni.request({
			method,
			url: base + url,
			data: {
				...options
			},
			withCredentials: true,
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
export const getListApi = () => request('get', '/personalized')

//手机验证码登录
export const loginCellPhone = phone => request('get', `/captcha/sent?phone=${phone}`)
export const loginCaptCha = (phone, code) => request('get',
	`/captcha/verify?phone=${phone}&captcha=${code}`)

//邮箱登录
export const emailLogin = (email, password) => request('get', `/login?email=${email}&password=${password}`)


//二维码登录
export const qrKey = () => request('get', `/login/qr/key?timestamp=${Date.now()}`)
export const qrCreate = key => request('get', `/login/qr/create?timestamp=${Date.now()}&key=${key}&qrimg=qrimg`)
export const qrCheck = key => request('get', `/login/qr/check?timestamp=${Date.now()}&key=${key}`)

//登录状态
export const loginStatus = () => request('get', `/login/status`)
export const getUserDetail = id => request('get', `/user/detail?uid=${id}`)
export const getUserAccount = () => request('get', `/user/account`)
export const getUserSubcount = () => request('get', `/user/subcount`)
export const getUserLevel = () => request('get', `/user/level`)


export const getSongsApi =() =>request('get' ,`/personalized/newsong`)




export const getPlayList = id => request('get', `/user/playlist?uid=${id}`)

//单曲
export const singleSong = id => request('get', `/song/detail?ids=${typeof id ==="object"?id.join(','):id}`)

export const getRankDetailApi = id => request('get', `/playlist/detail?id=${id}`)



// 首页banner部分数据
export const getAllDataApi = () => request('get', '/homepage/block/page')

export const getRankApi = () => request('get', '/toplist/detail')


export const getCommentApi = id => request('get', `/comment/playlist?id=${id}`)

export const getSearchHotApi = () => request('get', '/search/hot/detail')
export const getSearchResultApi = keyword => request('get', `/search/suggest?keywords=${keyword}&type=mobile`)
export const getSearchResultDeatilApi = keyword => request('get', `/search?keywords=${keyword}`)

// 每日推荐
export const getRecommendApi = () => request('get', '/recommend/songs')

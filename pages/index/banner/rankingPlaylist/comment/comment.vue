<script setup> 
import { ref, defineProps, defineEmits } from 'vue'
import { getCommentApi } from '../../../../../services'
const props = defineProps(['id'])
const emits = defineEmits(['hide'])

const commentList = ref([])
const boxRef = ref(null)


const hideComment = (e) => {
	if (e.detail.y < 160) {
		emits('hide')
	}
}


const getComment = async () => {
	const res = await getCommentApi(props.id)
	commentList.value = res.comments
}

getComment()
	
</script>

<template>
	<view class="box" @click="hideComment" ref="boxRef">
		<scroll-view class="content" scroll-y="true">
			<uni-section title="最新评论" type="line">
				<uni-list :border="true" v-for="item in commentList" :key="item.commentId">
					<uni-list-chat
						:title="item.user.nickname"
						:avatar="item.user.avatarUrl"
						:note="item.content"
						badge-positon="left"
						>
					</uni-list-chat>
				</uni-list>
			</uni-section>
		</scroll-view>
	</view>
</template>

<style lang="scss" scoped>
	.box{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		background: rgba(0,0,0,0.5);
		z-index: 1;
		overflow: hidden;
	}
	.content{
		position: absolute;
		top: 400rpx;
		left: 0;
	}
</style>

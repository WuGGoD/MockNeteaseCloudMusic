<script setup>
	import {
		ref,
		defineProps,
		defineEmits
	} from 'vue'

	import {
		useUserStore
	} from '../../../store/seachDetail.js'
	const emit = defineEmits(['callParentFn'])
	const list = defineProps(['result'])
	const userstore = useUserStore()
	const callParentFunction = (item) => {
		emit('callParentFn', item.keyword)
	}
</script>

<template>
	<view class="searchDetail">
		<view class="search-list">
			<view class="list-item" v-for="item in list.result" :key="item" @click="callParentFunction(item)">
				{{ item.keyword }}
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.search-list {
		width: 100%;
		height: auto;
		margin-top: 40rpx;

		.list-item {
			width: 100%;
			height: 80rpx;
			font-size: 30rpx;
			line-height: 80rpx;
			border-bottom: 2rpx dashed #dddddd;
			padding-left: 20rpx;
		}

		.list-item:last-child {
			border-bottom: none;
		}
	}
</style>
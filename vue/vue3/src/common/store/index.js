/**
 * @file store
 */

import { createStore } from 'vuex';
import {
	WEBINAR_STATUS_LIVE,
	WEBINAR_STATUS_NOTICE,
	WEBINAR_STATUS_OVER,
	WEBINAR_STATUS_BACK,
	WEBINAR_STATUS_INIT_OVER,
	WEBINAR_STATUS_OVER_TO_LIVE,
	PAGE_ROOM_IN,
	REMOTE_STREAM_SCREEN_SHARE,
	REMOTE_STREAM_INTERSTITIAL,
	WEBINAR_MODE_AUDIO,
	WEBINAR_MODE_VIDEO,
	WEBINAR_MODE_INTERACTION
} from 'src/common/const/status';

export default createStore({
	state: {
		jssdkInstance: null, // sdk实例
		user: {}, // 用户信息
		pageStatus: PAGE_ROOM_IN, // 状态
		// 房间信息
		room: {
			isOpenDocument: false, // 是否开启文档共享
			isSubscribeSpecial: false, // 是否订阅特殊流
			isSubscribeHost: false, // 是否订阅主持人流
			isHand: false, // 是否在麦
			isPlayerMainScreen: true, // 是否播放器在大屏上
			status: WEBINAR_STATUS_LIVE, // 活动状态
			mode: '', // 活动模式
			isDelay: true // 是否是延迟直播
		},
		// 特殊流
		specialStream: {
			[REMOTE_STREAM_SCREEN_SHARE]: '', // 桌面共享
			[REMOTE_STREAM_INTERSTITIAL]: '' // 插播
		},
		hostStreamInfo: {}, // 主持人流信息
		// 聊天
		chat: {
			isDisabled: false, // 是否禁言
			isOpenQuestion: false // 是否开启问答
		},
		// 本地
		local: {
			isMainScreen: false, // 是否本地流为主画面
			video: true, // 摄像头-开启
			audio: true // 麦克风-开启
		}
	},
	getters: {
		// 是否-无法正常进入房间
		isGlobalError(state) {
			return state.pageStatus !== PAGE_ROOM_IN;
		},
		// 直播-进行中
		isLive(state) {
			return state.room.status === WEBINAR_STATUS_LIVE;
		},
		// 直播-预约中
		isNotice(state) {
			return state.room.status === WEBINAR_STATUS_NOTICE;
		},
		// 直播-已结束
		isOver(state) {
			return state.room.status === WEBINAR_STATUS_OVER;
		},
		// 直播-回放
		isBack(state) {
			return state.room.status === WEBINAR_STATUS_BACK;
		},
		// 初始化-已结束
		isInitOver(state) {
			return state.room.status === WEBINAR_STATUS_INIT_OVER;
		},
		// 已结束转直播
		isOverToLive(state) {
			return state.room.status === WEBINAR_STATUS_OVER_TO_LIVE;
		},
		// 是否订阅桌面共享流
		isSubscribeShare(state) {
			return state.specialStream[REMOTE_STREAM_SCREEN_SHARE];
		},
		// 是否是音频活动
		isModeAudio(state) {
			return state.room.mode === WEBINAR_MODE_AUDIO;
		},
		// 是否是视频活动
		isModeVideo(state) {
			return state.room.mode === WEBINAR_MODE_VIDEO;
		},
		// 是否是互动活动
		isModeinteraction(state) {
			return state.room.mode === WEBINAR_MODE_INTERACTION;
		}
	},
	mutations: {
		// 设置用户
		setUser(state, user) {
			state.user = user;
		},
		// 设置实例对象
		setJSSDK(state, jssdkInstance) {
			state.jssdkInstance = jssdkInstance;
		},
		// 设置页面状态
		setPageStatus(state, status) {
			state.pageStatus = status;
		},
		// 设置房间信息
		setRoom(state, room) {
			state.room = {
				...state.room,
				...room
			};
		},
		// 设置聊天
		setChat(state, chat) {
			state.chat = {
				...state.chat,
				...chat
			};
		},
		// 设置主持人流
		setHostStreamInfo(state, hostStreamInfo) {
			state.hostStreamInfo = hostStreamInfo;
		},
		// 设置特殊流
		setSpecialStream(state, specialStream) {
			state.specialStream = {
				...state.specialStream,
				...specialStream
			};
		},
		// 设置本地信息
		setLocal(state, local) {
			state.local = {
				...state.local,
				...local
			};
		},
		// 直播结束-重置
		resetOverStatus(state) {
			state.room.isOpenDocument = false;
			state.room.isHand = false;
			state.room.isPlayerMainScreen = true;
			state.chat.isDisabled = true;
		},
		// 下麦-重置
		resetOutStatus(state) {
			state.room.isHand = false;
			state.hostStreamInfo = {};
			state.room.isSubscribeHost = false;
		}
	}
});
// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Component({
  data: {
    motto: '关于',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    restaurants: {
      fastfood: [
        { value: 'KFC', name: '肯德基' },
        { value: 'Burger King', name: '汉堡王' },
        { value: 'Dicos', name: '德克士' },
        { value: 'Kung Fu', name: '真功夫' },
        { value: 'Yonghe Dawang', name: '永和大王' },
        { value: 'Domino Pizza', name: '达美乐披萨' },
        { value: 'Starbucks', name: '星巴克' },
        { value: 'Pizza Hut', name: '必胜客' },
      ],
    },
    isChanging: false,
    toEat: '',
    eatList: [],
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  methods: {
    // 事件处理函数
    bindViewTap() {
      wx.navigateTo({
        url: '../logs/logs',
      })
    },
    checkboxChange(e: any) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value)
      this.data.eatList = e.detail.value
    },
    onChooseAvatar(e: any) {
      const { avatarUrl } = e.detail
      const { nickName } = this.data.userInfo
      this.setData({
        "userInfo.avatarUrl": avatarUrl,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    chooseFood: function () {
      let random = Math.floor(Math.random() * (this.data.eatList.length));
      let eat = this.data.eatList[random];
      console.log('this.data.eat', this.data.eatList[random]);
      console.log('radom', random);
      wx.showModal({
        title: '今日美味',
        content: eat,
        confirmText: '知道了',
        cancelText: 'TODO',
        success(res) {
          if (res.confirm) {
            console.log('用户单击确定');
          } else if (res.cancel) {
            console.log('用户单击取消');
          }
        }
      });
    },
    getUserProfile() {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    },
  },
})

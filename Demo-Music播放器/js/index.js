/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果
  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/
const App = new Vue({
  el: '#player',
  data: {
    query: "",
    musicList: [],
    isPlaying: false,
    musicCover: './images/cover.png',
    hotComments: [],
    musicUrl: '',
    isShow: false,
    mvUrl: '',
  },
  methods: {
    searchMusic: function () {
      let that = this;
      axios.get('https://autumnfish.cn/search?keywords=' + this.query)
        .then(function (response) {
          // console.log(response.data.result.songs);
          that.musicList = response.data.result.songs;
        })
        .catch(function (error) {
        })
    },
    playMusic: function (musicID) {
      let that = this;
      axios.get('https://autumnfish.cn/song/url?id=' + musicID)
        .then(function (response) {
          console.log(response);
          that.musicUrl = response.data.data[0].url
        })
        .catch(function (error) {
        })
      axios.get('https://autumnfish.cn/song/detail?ids=' + musicID)
        .then(function (response) {
          // console.log(response.data.songs[0].al.picUrl);
          that.musicCover = response.data.songs[0].al.picUrl;
        }, function (error) {
        }),
        axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + musicID)
          .then(function (response) {
            // console.log(response.data.hotComments);
            that.hotComments = response.data.hotComments;
          }, function (error) { })

    },
    playMV: function (mvid) {
      let that = this;
      axios.get('https://autumnfish.cn/mv/url?id=' + mvid)
        .then(function (res) {
          // console.log(mvid);
          // console.log(res);
          that.mvUrl = res.data.data.url;
          that.isShow = true;
        }, function (err) { })
    },
    play: function () {
      this.isPlaying = true;
    },
    pause: function () {
      this.isPlaying = false
    },
    hide: function () {
      this.isShow = false;
    }
  }
})
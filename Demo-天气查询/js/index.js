const App = new Vue({
    el: '#app',
    data: {
        city: '',
        weatherList: []
    },
    methods: {
        searchWeather: function () {
            let that = this;
            axios.get('http://wthrcdn.etouch.cn/weather_mini?city=' + that.city)
                .then(function (response) {
                    that.weatherList = response.data.data.forecast
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        changeCity: function (params) {
            this.city = params;
            this.searchWeather();
        }
    }
})
$(document).ready(function () {
    let countResult = [];
    let count = 0;
    let result = ['Chiếc thuyền ngoài xa', 'Vợ chồng A Phủ', 'Vợ nhặt', 'Người lái đò sông Đà', 'Đất nước', 'Việt Bắc'];
    let ketqua = '';

    function FindElement(array) {
        array.sort();
        let max = [0, 0];
        let findCount = 1;
        for (let i = array.length - 1; i > 0; --i) {
            if (array[i] == array[i - 1]) ++findCount;
            else {
                if (max[1] < findCount) {
                    max[0] = array[i];
                    max[1] = findCount;
                }
                findCount = 1;
            }
        }
        ketqua = `${max[0]}`;
    }
    const Update = (update = undefined) => {
        localStorage.setItem('countResult', countResult);
        localStorage.setItem('count', count);
        if (update == true) {
            localStorage.removeItem('countResult');
            localStorage.removeItem('count');
        }
    }
    const Load = () => {
        if (localStorage.getItem('countResult') == null) {
            countResult = [];
        } else {
            localStorage.getItem('countResult').split(',').forEach(item => {
                countResult.push(item);
            });
        }
        if (localStorage.getItem('count') == null) {
            count = 0;
        } else {
            count = localStorage.getItem('count');
        }
    }
    const Check = () => {
        if (count == 1000) {
            count = 0;
            FindElement(countResult);
            countResult = [];
            Update(true);
            $("#result").text(ketqua)
            $(".popup").fadeIn();
            Speech(`Tác phẩm năm nay là: ` + $("#result").text)
        }
    }

    const Random = () => {
        let randomValue = Math.floor(Math.random() * result.length);
        let randomResult = result[randomValue];
        return randomResult;
    }

    const Start = () => {
        Load();
        for (i = 0; i <= 1000; i++) {
            randomResult = Random();
            countResult.push(randomResult);
            count = i;
            Update();
            Check();
        }
    }

    function addAudio(src) {
        $(".popup").append(`<video class="audioPlayer" controls autoplay id="audio"><source src="${src}" type="audio/mp4"></video>`)
    }

    function Speech(input) {
        var settings = {
            "url": "https://api.zalo.ai/v1/tts/synthesize",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "apikey": "Grtndr0xJ1PoLji0iq0PATqTqoHe13IU",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
                "input": input
            }
        };

        $.ajax(settings).done(function (response) {
            addAudio(response.data.url)
        });
    }


    $("#guess-btn").click(() => {
        Start()
    })

    $("#close-btn").click(function () {
        $(".popup").fadeOut();
        $(".audioPlayer").remove()
    })
})




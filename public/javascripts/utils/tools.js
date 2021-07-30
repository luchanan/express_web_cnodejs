(function (window, document) {
    document.querySelector('.expand').onclick = function () {
        document.getElementById('right_menu').style.display = 'block'
        requestAnimationFrame(function(){
            document.getElementById('right_menu').style.opacity = '1'
            document.querySelector('#right_menu ul').classList.toggle('active')
        })
    }
    document.querySelector('#right_menu').onclick = function (e) {
        if (e.target.id == 'right_menu') {
            document.querySelector('#right_menu ul').classList.toggle('active')
            setTimeout(function () {
                document.getElementById('right_menu').style.display = 'none'
                document.getElementById('right_menu').style.opacity = '0'
            }, 300)
        }
    }
    var scrollToTop = document.querySelector('#scrollToTop')
    window.addEventListener('scroll', function () {
        // 滚动大于500显示
        if(document.documentElement.scrollTop > 100){
            scrollToTop.style.display = 'block'
            scrollToTop.classList.add('show')
            requestAnimationFrame(function(){
                scrollToTop.style.opacity = '1'
            })
        } else {
            scrollToTop.classList.remove('show')
            scrollToTop.style.display = 'none'
            scrollToTop.style.opacity = '0'
        }
    })
    var scrollToTopMethod = function (position) {
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function (cb) {
                return setTimeout(cb, 17);
            };
        }
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var step = function () {
            var distance = position - scrollTop;
            scrollTop = scrollTop + distance / 5;
            if (Math.abs(distance) < 1) {
                window.scrollTo(0, position);
            } else {
                window.scrollTo(0, scrollTop);
                requestAnimationFrame(step);
            }
        };
        step();
    }
    scrollToTop.onclick = function () {
        scrollToTopMethod(0)
    }
    window.TOOLS = {
    }
})(window, document)
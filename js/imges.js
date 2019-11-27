function currDevice(){
    let u = navigator.userAgent;

    let deviceBrowser = function(){
        return{
            trident: u.indexOf('Trident') > -1,  //IE内核
            presto: u.indexOf('Presto') > -1,  //opera内核
            webKit: u.indexOf('AppleWebKit') > -1,  //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,  //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/),  //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.Mac OS X/),  //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,  //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1,  //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1,  //是否iPad
            webApp: u.indexOf('Safari') == -1,  //是否web应用程序，没有头部和底部
            weixin: u.indexOf('MicroMessenger') > -1,  //是否微信
            qq: u.match(/\sQQ/i) == " qq",  //是否QQ
        }
    }();

    console.log( deviceBrowser.mobile);
    return  deviceBrowser.mobile

}
currDevice()

window.onload=function(){
    let imgAll = document.getElementsByTagName('img')
    let imgAllLength = imgAll.length
    let deg = 360/imgAllLength
    let warp = document.getElementsByClassName('warp')[0]
    let startx = 0
    let starty = 0
    let x = 0
    let y = 0
    let endx = 0
    let endy = 0
    var w = window.innerWidth;//获取浏览器宽
    console.log(w+'px');
    //warp.style.transform =`rotateX(${x}deg) rotateY(${y}deg)`
   // console.log(deg);
    Array.prototype.forEach.call(imgAll,function (ele,index) {
        ele.style.transform = `rotateY(${deg*index}deg) translateZ(${350}px)`
        ele.style.transition =`${1}s ${(imgAllLength-index)*0.1}s`
    })
 //PC端
    if (!currDevice()){
        document.onmousedown = function (e) {

            startx = e.pageX*0.01
            starty = e.pageY*0.01


            console.log(startx + '**' + starty);
            document.onmousemove = function (e) {

                let overx = e.pageX*0.01
                let overy = e.pageY*0.01
                endx = overx - startx
                endy = -(overy - starty)
                x = endx + x
                y = endy + y
                warp.style.transform =`rotateY(${x}deg) rotateX(${y}deg)`

            }
            document.onmouseup = function () {
                //warp.style.transform =`rotateY(${x}deg) rotateX(${y}deg)`
                document.onmousemove = null

                // console.log('松开了');
            }
        }
    }else {
        //移动端
        document.ontouchstart = function (e) {
            startx = e.touches[0].pageX*0.1
            starty = e.touches[0].pageY*0.1
            console.log( startx + '----' +  starty);
            document.ontouchmove = function (e) {
                let overx = e.touches[0].pageX*0.1
                let overy = e.touches[0].pageY*0.1
                endx = overx - startx
                endy = -(overy - starty)
                x = endx + x
                y = endy + y
                warp.style.transform =`rotateY(${x}deg) rotateX(${y}deg)`
            }
            document.ontouchend = function () {
                document.ontouchmove = null
                console.log('松开了');
            }
        }

    }

}


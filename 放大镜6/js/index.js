;(function(doc) {
    var imgWrap = doc.getElementsByClassName('img-wrap')[0],
        imgWrapL = imgWrap.offsetLeft,
        imgWrapT = imgWrap.offsetTop,
        imgWrapW = getStyle(imgWrap, 'width'),
        imgWrapH = getStyle(imgWrap, 'height'),
        magWrap = doc.getElementsByClassName('mag-wrap')[0],
        magWrapH = getStyle(magWrap, 'height'),
        magWrapW = getStyle(magWrap, 'width'),
        magImg = doc.getElementsByClassName('mag-img')[0];

    addEvent(imgWrap, 'mouseover', function() {
        addEvent(document, 'mousemove', mouseMove);
        magWrap.className += ' active';
    });
    addEvent(imgWrap, 'mouseout', mouseOut);

    function mouseMove(e) {
        var e = e || window.event,
            x = pagePos(e).x - imgWrapL - (magWrapW>>1),    //  将鼠标的位置定在小盒子的中心
            y = pagePos(e).y - imgWrapT - (magWrapH>>1);
        console.log(x);
        magWrap.style.left = x + 'px';
        magWrap.style.top = y + 'px';
        magImg.style.left = -x + 'px';
        magImg.style.top = -y + 'px';
        hide(e);
    } 
    function mouseOut() {
        magWrap.className = 'mag-wrap';
    }
    function hide(e) {
        var mouseX = pagePos(e).x - imgWrapL,
            mouseY = pagePos(e).y - imgWrapT;
            console.log(imgWrapW);
        if((mouseX < -5 || mouseX > imgWrapW + 5) || (mouseY < -5 || mouseY > imgWrapH + 5)) {
            magWrap.className = 'mag-wrap';
        }
    }
})(document);

function addEvent(elem, type, func){
    if(elem.addEventListener){
        elem.addEventListener(type, func, false);
    } else if(elem.attachEvent){
        elem.attachEvent('on' + type, function() {
            func.call(elem);
        });
    } else{
        elem['on' + type] = func;
    }
}

function removeEvent(elem, type, func){
    if(elem.addEventListener) {
        elem.removeEventListener(type, func, false);
    } else if(elem.attachEvent){
        elem.detachEvent('on' + type, func);
    } else {
        elem['on' + type] = null;
    }
}

function getStyle(elem, prop){
    if(window.getComputedStyle){
        if(prop){
            return parseInt(window.getComputedStyle(elem, null)[prop]);
        } else{
            return window.getComputedStyle(elem, null);
        }
    } else{
        if(prop){
            return parseInt(elem.currentStyle[prop]);
        } else{
            return elem.currentStyle;
        }
    }
}

function getScroll(){
    if(window.pageXOffset){
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        };
    } else {
        return {
            left: document.body.scrollLeft + document.documentElement.scrollLeft,
            top: document.body.scrollTop + document.documentElement.scrollTop
        };
    }
}

function pagePos(e) {
    var sLeft = getScroll().left,
        sTop = getScroll().top,
        cLeft = document.documentElement.clientLeft,
        cTop = document.documentElement.clientTop;
    
    return {
        x: sLeft + e.clientX - cLeft,
        y: sTop + e.clientY - cTop
    }
}
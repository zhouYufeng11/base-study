window.onload = function() {
    init();
}

function init() {
    initMenu();
}

var initMenu = (function() {
    var menuWrap = document.getElementsByClassName('menu-wrap')[0],
        oMenu = document.getElementsByClassName('menu')[0],
        menuItems = document.getElementsByClassName('menu-item'),
        menuItemLen = menuItems.length,
        oSub = document.getElementsByClassName('sub')[0],
        subItems = document.getElementsByClassName('sub-item'),
        subItemLen = subItems.length,
        mousePos = [],  //  用来存鼠标移动的时候的坐标
        isInSub = false,
        isFirst = true, //  判断是否是第一次进入
        thisIdx,
        menuItem,
        subItem,
        t = null;   //  设置定时器
    
    //  绑定事件处理函数
    //  循环绑定
    for(var i = 0; i < menuItemLen; i++) {
        menuItem = menuItems[i];
        addEvent(menuItem, 'mouseenter', menuItemsMouseenter);
        addEvent(menuItem, 'mouseleave', menuItemsMouseleave);
    }

    addEvent(menuWrap, 'mouseenter', function() {

    });

    addEvent(menuWrap, 'mouseleave', function() {
        removeActive();
        oSub.className += ' hide';

        //  注意离开的时候不要忘记清理定时器, 否则会因为 isInSub = false；执行定时器
        if(t) {
            clearTimeout(t);
        }
    });

    //  鼠标进入 menu-list
    addEvent(oMenu, 'mouseenter', function() {
        addEvent(document, 'mousemove', mouseMove);
    });

    addEvent(oMenu, 'mouseleave', function() {
        removeEvent(document, 'mousemove', mouseMove);
    });

    //  sub
    addEvent(oSub, 'mouseenter', function() {
        isInSub = true;
    });

    addEvent(oSub, 'mouseleave', function() {
        isInSub = false;
    });

    //  绑定的事件处理函数
    function menuItemsMouseenter(e) {
        var e = e || window.event,
            tar = e.target || e.srcElement,
            oParent = getParent(tar, 'li'),
            mousePosLen = mousePos.length,
            lastPos = mousePos[mousePosLen - 2] || {x: 0, y: 0},    // 当前的上一个点
            curPos = mousePos[mousePosLen - 1] || {x: 0, y: 0}, //  当前的
            toDelay = doTimeout(lastPos, curPos);
        
        //  获取当前元素的下标
        thisIdx = Array.prototype.indexOf.call(menuItems, oParent);

        //  清掉前面的定时器
        if(t) {
            clearTimeout(t);
        }
        console.log(toDelay);
        if(!isFirst) {
            //  如果当前的这一个点在三角形里面 就不让其切换 
            if(toDelay) {
                t = setTimeout(function() {
                    if(isInSub) {   //  判断鼠标此时是否在 sub （子菜单里面）
                        return; //  如果在的话就停止程序向下执行， 300ms 后不在切换
                    }
        
                    setActive(thisIdx);
                    t = null;
                }, 300);
            } else {
                setActive(thisIdx);
            }
        } else {
            setActive(thisIdx);
            isFirst = false;
        }
        
        

        oSub.className = 'sub';

    }

    function menuItemsMouseleave() {
    }

    //  添加样式 / 移除样式
    function setActive(thisIdx) {
        //  先清除所有元素的样式
        removeActive();
        menuItems[thisIdx].className += ' active';
        subItems[thisIdx].className += ' active';
    }

    function removeActive() {
        //  排他思想 先清空样式 在添加样式
        for(var i = 0; i < menuItemLen; i++) {
            menuItem = menuItems[i];
            subItem = subItems[i];
            menuItem.className = 'menu-item';
            subItem.className = 'sub-item';
        }
    }

    //  鼠标移动
    function mouseMove(e) {
        mousePos.push({
            x: pagePos(e).X,
            y: pagePos(e).Y
        })

        //  为了让数组始终之保持后面两个元素
        if(mousePos.length > 2) {
            mousePos.shift();
        }
    }

    function doTimeout(lastPos, curPos) {
        //  找到 menu-list 的右上角 和 右下角的坐标
        var TR = {
                x: getStyle(menuWrap, 'left') + getStyle(oMenu, 'width'),
                y: getStyle(menuWrap, 'top')
            },
            BR = {
                x: getStyle(menuWrap, 'left') + getStyle(oMenu, 'width'),
                y: getStyle(menuWrap, 'top') + getStyle(oMenu, 'height')
            };

        return pointInTriange({
            curPos: curPos,
            lastPos: lastPos,
            topLeft: TR,
            bottomLeft: BR
        });
    }
});

//  addEvent 绑定事件
function addEvent(elem, type, func) {
    if(elem.addEventListener) {
        elem.addEventListener(type, func, false);
    } else if(elem.attachEvent) {
        elem.attachEvent('on' + type, function() {
            func.call(elem);
        });
    } else {
        elem['on' + type] = func;
    }
}

//  removeEvent 取消事件绑定
function removeEvent(elem, type, func) {
    if(elem.addEventListener) {
        elem.removeEventListener(type, func, false);
    } else if(elem.attachEvent) {
        elem.detachEvent('on' + type, function() {
            func.call(elem);
        });
    } else {
        elem['on' + type] = null;
    }
}

//  获取指定的父元素结点
//  toLowerCase() 小写      toUpperCase() 大写
function getParent(elem, type) {
    var tarName = elem.tagName.toLowerCase();
    while(tarName !== type) {
        elem = elem.parentNode;
        tarName = elem.tagName.toLowerCase();
    }
    return elem;
}

//  获取样式
function getStyle(elem, prop) {
    if(window.getComputedStyle) {
        if(prop) {
            return parseInt(window.getComputedStyle(elem, null)[prop]);
        } else {
            return window.getComputedStyle(elem, null);
        }
    } else if(elem.currentStyle) {
        if(prop) {
            return parseInt(elem.currentStyle[prop]);
        } else {
            return elem.currentStyle;
        }
    }
}

//  获取坐标
//  window.pageXOffset 获取页面被卷去部分的长度 也就是页面的偏移量
//  document.ducumentElement 获取 html  clientLeft 元素边框的宽度
//  e.clientX 鼠标触发事件的时候鼠标在可视化区域的坐标
function pagePos(e) {
    var sLeft = window.pageXOffset,
        sTop = window.pageYOffset,
        cLeft = document.documentElement.clientLeft,
        cTop = document.documentElement.clientTop;

    return {
        X: sLeft + e.clientX - cLeft,
        Y: sTop + e.clientY - cTop
    }
}
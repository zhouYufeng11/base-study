Element.prototype.initTrag = (function(menu) {
    trag.call(this);

    function trag() {
        var _self = this,
            boxW = getStyle(_self, 'width'),
            boxH = getStyle(_self, 'height'),
            menuW = getStyle(menu, 'width'),
            menuH = getStyle(menu, 'height'),
            clientW = getViewSize().width,
            clientH = getViewSize().height,
            //  用来记录鼠标第一次按下时 盒子的位置
            originalPos = [],
            //  用来记录点击的是鼠标的哪个键
            btnCode,
            //  用来判断是 点击 还是 滑动   
            sTime,  //  1、开始时间
            eTime,  //  2、结束时间
            counter = 0,    //  用来记录点击的次数的  （鼠标抬起的次数）
            //  用来判断是 单击 还是 双击
            sbTime,
            ebTime,
            //  用来记录鼠标距离盒子边框的距离
            x,  
            y,
            //  设置定时器用来清理数据（重置）
            t = null;
    
        //  绑定事件
        addEvent(_self, 'mousedown', function(e) {
            var e = e || window.event;
            
            //  记录鼠标按下的键的代码 code
            btnCode = e.button;

            //  判断点击的是鼠标的左键还是右键
            //  1、右键 将菜单显示出来
            //  2、左键 就执行拖拽，单击 / 双击 操作
            if(btnCode === 2) {
                var mLeft = pagePos(e).x,
                    mTop = pagePos(e).y;
                
                //  限制 menu 的显示区域
                if(clientW - mLeft <= menuW) {
                    mLeft = pagePos(e).x - menuW;
                }
                if(clientH - mTop <= menuH) {
                    mTop = pagePos(e).y - menuH;
                }

                menu.style.left = mLeft + 'px';
                menu.style.top = mTop + 'px';
                menu.style.display = 'block';
            } else if(btnCode === 0) {
                //  记录鼠标按下时盒子的位置，供后面 因点击时滑动造成的偏移， 让盒子归位
                originalPos = [getStyle(_self, 'left'), getStyle(_self, 'top')];

                //  用来记录开始时间戳
                sTime = new Date().getTime();
                menu.style.display = 'none';
                //  记录 鼠标按下位置距离 盒子边框的距离  
                x = pagePos(e).x - getStyle(_self, 'left');
                y = pagePos(e).y - getStyle(_self, 'top');
        
                addEvent(document, 'mousemove', mouseMove);
                addEvent(document, 'mouseup', mouseUp);
            }

            stopBubble(e);
            stopDefault(e);
        });
    
        //  阻止右键菜单的默认行为
        addEvent(document, 'contextmenu', function(e) {
            stopBubble(e);
            stopDefault(e);
        });

        //  点击任意地方 让菜单隐藏起来
        addEvent(document, 'click', function() {
            menu.style.display = 'none';
        });

        //  点击 menu 区域 不然该区域隐藏
        addEvent(menu, 'click', function(e) {
            //  阻止冒泡 让盒子隐藏起来
            stopBubble(e);
        });


        //  鼠标移动
        function mouseMove(e) {
            var e = e || window.event;
    
            //  鼠标移动控制盒子跟着一起移动
            _self.style.left = pagePos(e).x - x + 'px';
            _self.style.top = pagePos(e).y - y + 'px';
    
            //  限制盒子可移动的区域
            //  1、限制左右区域
            if(getStyle(_self, 'left') <= 0) {
                _self.style.left = 0;
            } else if(getStyle(_self, 'left') >= clientW - boxW) {
                _self.style.left = clientW - boxW -1 + 'px';
            }
            //  2、限制上下区域
            if(getStyle(_self, 'top') <= 0) {
                _self.style.top = 0;
            } else if(getStyle(_self, 'top') >= clientH - boxH) {
                _self.style.top = clientH - boxH - 1 + 'px';
            }
            
        }
    
        //  鼠标抬起
        function mouseUp(e) {
            var e = e || window.event;
    
            //  记录结束时的时间戳
            eTime = new Date().getTime();
            console.log(_self);
            //  观察 鼠标按下 到 鼠标抬起 的时间差 是否在 100ms 以内   是 单击 -> 让盒子回到鼠标按下时 盒子的位置
            if(eTime - sTime <= 100) {
                _self.style.left = originalPos[0] + 'px';
                _self.style.top = originalPos[1] + 'px';

                counter++;

                //  区分是 单击 还是 双击
                if(counter === 1) {
                    sbTime = new Date().getTime();
                }

                if(counter === 2) {
                    ebTime = new Date().getTime();
                }

                //  双击    ***
                if(sbTime && ebTime && ebTime - sbTime <= 200) {
                    console.log('双击了')
                } 
            }
            
            //  延迟清空  因为如果将其放到 双击里面 ，当之点击一下 而出现 counter 在没有有点击第二下的时候一直等于1 主要是 sbTime 一直等于第一次时的数据，所以之后再双击就没有效果了
            //  防止点击一次之后 长时间之后在点击第二下而造成的问题
            t = setTimeout(function() {
                sbTime = 0;
                ebTime = 0;
                counter = 0;
                clearTimeout(t);
            }, 300);

            removeEvent(document, 'mousemove', mouseMove);
            removeEvent(document, 'mouseup', mouseUp);
        }
    }
});




//  事件绑定
function addEvent(elem, type, func) {
    if(elem.addEventListener) {
        elem.addEventListener(type, func, false);
    } else if(elem.attachEvent) {
        elem.attachEvent('on' + type, function() {
            func.call(elem);
        })
    } else {
        elem['on' + type] = func;
    }
}

//  解除事件绑定
function removeEvent(elem, type, func) {
    if(elem.removeEventListener) {
        elem.removeEventListener(type, func, false);
    } else if(elem.attachEvent) {
        elem.detachEvent('on' + type, func);
    } else {
        elem['on' + type] = func;
    }
}

//  阻止事件冒泡
function stopBubble(e) {
    if(e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true; //   cancel 取消   bubble 冒泡
    }
}

//  阻止事件默认行为
function stopDefault(e) {
    if(e.preventDefault) {
        e.preventDefault(); //  prevent 阻止
    } else {
        e.returnValue = false;
    }
}

//  获取 dom 元素的样式值
function getStyle(elem, prop) {
    if(window.getComputedStyle) {
        if(prop) {
            return parseInt(window.getComputedStyle(elem, null)[prop]);
        } else {
            return window.getComputedStyle(elem, null);
        }
    } else if(elem.currentStyle){
        if(prop) {
            return parseInt(elem.currentStyle[prop]);
        } else {
            return elem.currentStyle;
        }
    }
}

//  获取页面滚动距离 页面偏移量
function getScrollOffest() {
    if(window.pageXOffset) {
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    } else {
        return {
            left: document.body.scrollLeft + document.documentElement.scrollLeft,
            top: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

//  获取可视化区域的宽高
//  innerWidth 在 window 上面
function getViewSize() {
    if(window.innerWidth) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }   
    } else {    //  兼容 ie 低版本  还有兼容性模式
        if(document.compatMode === 'BackCompat') {
            return {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            }
        } else if(document.compatMode === 'CSS1Compat'){
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }
    }
}

//  获取触发事件时鼠标相对于页面的位置
function pagePos(e) {
    var sTop = getScrollOffest().top,
        sLeft = getScrollOffest().left,
        cTop = document.documentElement.clientTop,  //  解决 ie8 出现的问题
        cLeft = document.documentElement.clientLeft;
    
    return {
        x: sLeft + e.clientX - cLeft,
        y: sTop + e.clientY - cTop
    }
}
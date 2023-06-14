window.onload = function() {
    init();
}

function init() {
    keySearch;
}

var keySearch = (function() {
    var input = document.getElementById('j-input'),
        content = document.getElementsByClassName('content')[0],
        text = JSON.parse(content.getAttribute('data-config')),
        len = text.length,
        t = null,
        index = 0;
    
    setText();

    //  输入框，获取焦点
    input.addEventListener('focus', setFocus, false);
    
    input.addEventListener('blur', getBlur, false);

    function setFocus() {
        console.log('ok');
        clearInterval(t);
        content.style.display = 'none';
    }

    function getBlur() {
        if(input.value.length === 0) {
            setText();
            content.style.display = 'block';
        }
    }

    function setText() {
        t = setInterval(function() {
            content.innerHTML = text[index];
            index = index >= len - 1 ? 0 : ++index;
        }, 1000);
    }
})() 
var jseditor, svgeditor, images, currentImage;

function saveImage(name) {
    var data = jseditor.getSession().getValue()
        + "###CUT###" + svgeditor.getSession().getValue();
    localStorage.setItem('image_' + name, data);
    currentImage = name;
}

function initExistingImages() {
    var html = '';
    for (var i in images) {
        html += '<option value="' + images[i] +'"';
        if (images[i] == currentImage)
            html += ' selected';
         html += '>' + images[i] + '</option>';
    }
    var imageSelector = document.getElementById('imageSelector');
    if (currentImage == null) {
        html = '<option value="" selected>Load image</option>' + html;
    } else {
        html = '<option value="">New image</option>' + html;
    }
    imageSelector.innerHTML = html;
    imageSelector.onchange = onLoadImage;
    imageSelector.style.display = 'inline';
}

function onSaveImage(event) {
    var name;
    if (currentImage == null) {
        name = prompt('Input image name to save');
        if (name == null || name == '')
            return;
        saveImage(name);
        images.push(name);
        localStorage.setItem('images', images.join(','));
    } else {
        saveImage(currentImage);
    }
    initExistingImages();
    event.preventDefault();
}

function loadImage(name) {
    var data = localStorage.getItem('image_' + name);
    if (data != null) {
        data = data.split('###CUT###');
        jseditor.getSession().setValue(data[0]);
        svgeditor.getSession().setValue(data[1]);
        currentImage = name;
    }
}

function onLoadImage(event) {
    var name = event.target.value;
    if (name == '' && currentImage != null) {
        if (confirm('Are you sure want to create new image?')) {
            jseditor.getSession().setValue('');
            svgeditor.getSession().setValue('');
            currentImage = null;
            initExistingImages();
            return;
        }
    }
    if (currentImage == name)
        return;
    loadImage(name);
}

window.onload = function() {
    var saveLink = document.getElementById('saveLink');
    if ( !localStorage.getItem ) {
        saveLink.innerHTML = 'local storage support needed to save';
        saveLink.href = '';
    } else {
        saveLink.onclick = onSaveImage;
        images = localStorage.getItem('images');
        if (images != null) {
            images = images.split(',');
            initExistingImages();
        } else {
            images = [];
        }
    }
    jseditor = ace.edit("jseditor");
    var JavaScriptMode = require("ace/mode/javascript").Mode;
    jseditor.getSession().setMode(new JavaScriptMode());

    svgeditor = ace.edit("svgeditor");
    var SVGMode = require("ace/mode/svg").Mode;
    svgeditor.getSession().setMode(new SVGMode());
}

function render() {
    var params = eval(jseditor.getSession().getValue());
    var xml = sprintf(svgeditor.getSession().getValue(), params);
    
    var object = document.createElement("object");
    object.width = params.width;
    object.height = params.height;
    object.data = "data:image/svg+xml," + encodeURIComponent(xml);
    object.type = "image/svg+xml";
    var width = parseInt(params.width);
    var left;
    if (isNaN(width)) {
        width = parseInt(params.width.replace('px', ''));
        if (isNaN(width)) {
            left = '300px';
        } else {
            left = (document.body.clientWidth - width)/2;
            left = left + 'px';
        }
    } else {
        left = (document.body.clientWidth - width)/2;
        left = left + 'px';
    }

    var popup = document.getElementById('imagePopup');
    popup.style.left = left;
    popup.width = params.width;
    var container = document.getElementById('container');
    container.innerHTML = '';
    container.appendChild(object);
    popup.style.display = 'block';
}

function closePopup(event) {
    document.getElementById('imagePopup').style.display = 'none';
    event.preventDefault();
}
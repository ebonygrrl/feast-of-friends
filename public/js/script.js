const init = () => {
    const newWindow = window.location.pathname;
    const path = newWindow.split('/', 2).pop();
    console.log(path);
    let addClass = path === '' ? 'home' : path;

    // add class to body tag for css
    $('body').addClass(addClass);

    if (path === 'event') {
        var btn = document.getElementById('copyID');
        var clipboard = new ClipboardJS(btn);
        clipboard.on('success', function (e) {
            console.info('Action:', e.action);
            console.info('Text:', e.text);
            console.info('Trigger:', e.trigger);
        });
        clipboard.on('error', function (e) {
            console.info('Action:', e.action);
            console.info('Text:', e.text);
            console.info('Trigger:', e.trigger);
        });
        var btnWhere = document.getElementById('copyWhere');
        var clipboard2 = new ClipboardJS(btnWhere);
        clipboard2.on('success', function (e) {
            console.info('Action:', e.action);
            console.info('Text:', e.text);
            console.info('Trigger:', e.trigger);
        });
        clipboard2.on('error', function (e) {
            console.info('Action:', e.action);
            console.info('Text:', e.text);
            console.info('Trigger:', e.trigger);
        });
    }
}

init();
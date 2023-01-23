const init = () => {
    const newWindow = window.location.href;
    const path = newWindow.split('/').pop();
    let addClass = path === '' ? 'home' : path;

    $('body').addClass(addClass);
}

init();
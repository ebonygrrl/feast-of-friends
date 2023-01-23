function printElement(e) {
    let cloned = e.cloneNode(true);
    document.body.appendChild(cloned);
    cloned.classList.add("printable");
    window.print();
    document.body.removeChild(cloned);
  };
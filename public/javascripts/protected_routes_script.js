document.onclick = function (e) {
  if (e.target.tagName === "A") {
    const href = e.target.getAttribute("href");
    const restricted_actions = ["edit", "delete", "new"];

    for (action of restricted_actions) {
      if (href.includes(action)) {
        e.preventDefault();

        const password = prompt("Contraseña");

        if (password === null) {
          return;
        } else if (password === "areslaika") {
          window.location.href = href;
        } else {
          alert("Incorrecta");
        }

        break;
      }
    }
  }
};

class AuthenticationController {
  render = (req, res, filename, other) => {
    res.render(`./authentication/${filename}`, {
      req,
      ...other,
    });
  };

  login = async (req, res) => {
    if (req.session.passphrase) {
      return res.redirect("/animals");
    }
    this.render(req, res, "login");
  };

  authenticate = async (req, res) => {
    const { passphrase } = req.body;
    if (passphrase === process.env.GUEST || passphrase === process.env.ADMIN) {
      req.session.passphrase = passphrase;
      res.redirect("/animals");
    } else {
      throw new Error("Frase inválida");
    }
  };

  logout = async (req, res) => {
    req.session?.destroy();
    res.clearCookie("qid");

    res.redirect("/login");
  };
}

module.exports = AuthenticationController;

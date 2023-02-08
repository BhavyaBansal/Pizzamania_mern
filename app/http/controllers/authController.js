function authController() {
  return {
    login(req, res) {
      res.render("auth/login");
    },
    register(req, res) {
      res.render("auth/register");
    }
  };
}
module.exports = authController;
// Factory Functions - Type of Patterns in a language
// A function that returns object

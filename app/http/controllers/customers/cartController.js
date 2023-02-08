function cartController() {
  return {
    index(req, res) {
      res.render("customers/cart");
    },
  };
}
module.exports = cartController;
// Factory Functions - Type of Patterns in a language
// A function that returns object

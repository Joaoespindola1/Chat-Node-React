const mongoose = require("mongoose");
const User = mongoose.model("User");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;


  if (password.length < 6) throw "A senha deve ter ao menos 6 caracteres.";

  const userExists = await User.findOne({
    email,
  });

  if (userExists) throw "Usuario com o mesmo email já existe.";

  const user = new User({
    name,
    email,
    password: sha256(password + process.env.SALT),
  });

  await user.save();

  res.json({
    message: "Usuario [" + name + "] registrado com sucesso!",
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password: sha256(password + process.env.SALT),
  });

  if (!user) throw "Email e Senha não batem.";

  const token = await jwt.sign({ id: user.id }, process.env.SECRET);

  res.json({
    message: "Usuário logado com sucesso!",
    token,
  });
};

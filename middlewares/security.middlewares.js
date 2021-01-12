exports.checkParamsLogin = (req, res, next) => {
    const { name, password } = req.body
    if (!name || !password )
      res.status(400).json({ error: "You miss something" });
    else next();
  };

  exports.checkParamsRegister = (req, res, next) => {
    const { name, password, age, crew } = body
    if (!name || !password || age || crew )
      res.status(400).json({ error: "You miss something" });
    else next();
  };
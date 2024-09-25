const { status } = require("./statuscodes");

exports.schemaValidation = (schema) => (req, res, next) => {
    for (const field in schema) {
      if (!req.body[field]) {
        return res.status(status.badRequest).json({ msg: `Please enter ${schema[field]}` });
      }
    }
    next();
  };
  
  
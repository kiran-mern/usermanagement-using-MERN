const Admin = require("../models/admin");
const { token } = require("../utils/jwt");
const json = require("body-parser");
const userH = require("../helpers/userHelper");

module.exports = {
  adminLogin: async (req, res) => {
    const { email, password } = req.body;

    const adminData = await Admin.findOne({ email });
    console.log(adminData);

    if (!adminData) {
      res.status(400).json({ message: "no admin" });
    } else {
      const Email = adminData.email;
      const Password = adminData.password;

      if (Email == email) {
        if (Password == password) {
          const Token = token(Email);
          res.status(200).json({ message: "admin Loggedin", token: Token });
        } else {
          res.status(400).json({ message: "Invalid Password" });
        }
      } else {
        res.status(400).json({ message: "Invalid Email" });
      }
    }
  },
  dashboard: async (req, res) => {
    const user = await userH.findUser();
    if (user) {
      res.status(200).json({ message: "user data fetched", users: user });
    } else {
      res.status(400).json({ message: "not fetched" });
    }
  },
  deleteUser: async (req, res) => {
    console.log(req.body);
    const id = req.body.deleteUserId;
    const delUser = await userH.deleteUser(id);
    console.log(delUser);
  },
};

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function registerUser(req, res) {
  try {
    const { username, password, firstname, lastname } = req.body;
    if (!username) {
      throw { name: "Username cannot be null", status: 401 };
    } else if (!password) {
      throw { name: "Password cannot be null", status: 401 };
    } else if (!firstname) {
      throw { name: "Firstname cannot be null", status: 401 };
    } else if (!lastname) {
      throw { name: "Lastname cannot be null", status: 401 };
    } else {
      const salt = await bcrypt.genSalt(10);
      const passHash = await bcrypt.hash(password, salt);
      const user = await req.context.models.users.create({
        username: username,
        password: passHash,
        createdat: new Date(),
        updatedat: new Date(),
      });

      const customer = await req.context.models.customers.create({
        firstname: firstname,
        lastname: lastname,
        user_id: user.id,
        createdat: new Date(),
        updatedat: new Date(),
      });
      res.send({ username, firstname, lastname });
    }
  } catch (error) {
    res.status(error.status).send(error.name);
  }
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await req.context.models.users.findOne({
      where: { username },
    });
    if (!user) {
      throw { name: "No username was found" };
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        let token = jwt.sign(
          { user_id: user.password },
          process.env.SECRET_KEY,
          {
            expiresIn: "2h",
          }
        );
        res.send({ username: user.username, token: token });
      } else {
        throw { name: "Wrong Password" };
      }
    }
  } catch (error) {
    res.status(401).send(error.name);
  }
}

async function getCustomerAndAccount(req, res) {
  try {
    const user = await req.context.models.users.findAll({
      include: [
        {
          model: req.context.models.customers,
          as: "customers",
        },
      ],
    });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
}

export default {
  registerUser,
  loginUser,
  getCustomerAndAccount,
};

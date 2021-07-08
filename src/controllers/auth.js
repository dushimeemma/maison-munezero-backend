import bcrypt from 'bcryptjs';

import { User } from '../database/models';
import { encode } from '../utils/jwt_functions';

class AuthController {
  async signup(req, res) {
    const { name, email, password } = req.body;
    const checkUser = await User.findOne({ where: { email } });

    if (checkUser) {
      return res.status(400).json({
        error: 'Email already exists',
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = {
      name,
      email,
      password: hash,
    };

    const token = encode(newUser);
    await User.create(newUser);

    res.status(200).json({
      message: 'Registered successfully',
      data: { token, user: { name: newUser.name, email: newUser.email } },
    });
  }

  async login(req, res) {
    const { email, password } = req.body;

    const checkUser = await User.findOne({ where: { email } });
    const checkPassword = bcrypt.compareSync(password, checkUser.password);

    if (!checkUser || !checkPassword) {
      return res.status(401).json({
        error: 'Invalid credentials',
      });
    }

    const user = {
      name: checkUser.name,
      email: checkUser.email,
    };

    const token = encode(user);

    res.status(200).json({
      message: 'Logged in successfully',
      data: { token, user },
    });
  }
}

export default AuthController;

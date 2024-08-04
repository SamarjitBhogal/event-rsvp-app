import { User } from '../../models/user.js';
import { userSchema } from '../../config/joi-schemas.js';
import { signJWT } from '../../utils/jwt.js';
import { compareHashedPasswords } from '../../utils/bcrypt.js';

export const post = async (req, res) => {
	const result = userSchema.validate(req.body);
	if (result.error)
		return res.status(400).send({ message: 'Could not login.', error: result.error.details[0].message });

	let { userName, userEmail, password } = req.body;

	const user = await User.getUser(userName, userEmail);
	if (!user) return res.status(400).send({ message: 'Invalid credentials.' });

    const compareResult = compareHashedPasswords(password, user.UserPassword);
    if (!compareResult) return res.status(400).send({ message: 'Invalid password.' });

	return res.status(200).send({ message: 'Login successfull.', value: await signJWT(user) });
};

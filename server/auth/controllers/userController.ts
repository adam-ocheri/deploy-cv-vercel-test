import { Request, Response } from 'express';
import CeeveeUser from '../models/ceeveeUsers';
import { comparePassword } from '../../resume/utilities/passwords';
import { getAuthToken, verifyAuthToken } from '../../resume/utilities/jwt';
import { sendMail } from '../../resume/config/email';
import { z } from 'zod';
import { saltHashPassword } from '../../utils/authUtils';

const UserValidator = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
});

// @desc Get User Data
// @route GET /api/auth/me
// @access  Public
const getUserDataController = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get the token from the request headers
        const token = req.headers.authorization?.split(' ')[1];

        try {
            const decodedToken = verifyAuthToken(token as string);

            const userId = decodedToken as {
                id: string;
                userId: string;
            };

            const user = await CeeveeUser.findById(userId.id as string)
                .select('-password')
                .lean();

            res.status(200).json({ user, token });
        } catch (error) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

// @desc    Create User
// @route   POST /api/auth/register
// @access  Public
const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = UserValidator.parse(req.body);

        // Check if the user already exists in the database
        let user = await CeeveeUser.findOne({ email }).select('-password');
        // send a response with a message if the user already exists
        if (user) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        // hash password
        const hashedPassword = await saltHashPassword(password);
        // Create a new user in the database
        user = await CeeveeUser.create({ username, email, password: hashedPassword });

        const token = getAuthToken(user.id, process.env.JWT_EXPIRES_IN as string);

        const message = `Welcome to Ceevee, ${username} !`;

        await sendMail({
            email: `${email}`,
            subject: 'Welcome to Ceevee',
            message: message,
        });
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

// @desc    Login User
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Check if the user already exists in the database
        const user = await CeeveeUser.findOne({ email });

        // send a response with a message if the user already exists

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Exclude the password field from the user object
        const { password: userPassword, ...userWithoutPassword } = user.toObject();
        // Check if the password is correct
        const isPasswordCorrect = await comparePassword(password, userPassword as string);

        if (!isPasswordCorrect) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        // Send a response with the user data with jwt token
        const token = getAuthToken(user?.id, process.env.JWT_EXPIRES_IN as string);

        res.status(200).json({ user: userWithoutPassword, token });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    const user = await CeeveeUser.findOne({ email });

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const token = getAuthToken(user.id, '10m');

    const resetUrl = `<html lang="en" style="height: 100%">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Barlow&family=Inter&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet"
  />
  <title>Document</title>
  <style>
    body {
      font-family: 'Inter', sans-serif;
      height: 100%;
    }

    .container {
      max-width: 550px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin: 0 auto;
    }

    .reset-title {
      font-size: 24px;
      font-weight: bold;
    }

    .reset-subtitle {
      font-size: 18px;
    }

    .reset-button {
      outline: none;
      border: none;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 12px 10px;
      gap: 10px;
      background: linear-gradient(90deg, #005e93 0.03%, #34b3e4 96.47%);
      box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      font-weight: 700;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      text-decoration: none;
    }

    .reset-button:hover {
      background: linear-gradient(90deg, #34b3e4 0.03%, #005e93 96.47%);
    }

    .message {
      color: #000;
    }

    .signature {
      color: initial;
      font-weight: 700;
    }

    .signature-link {
      color: initial;
      font-weight: 700;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="reset-title">Reset your password</h1>
    <h2 class="reset-subtitle">Hi, ${email}</h2>
    <p class="message">
      Please click the button below to reset your password. The link will
      expire in 10 minutes.
    </p>
    <a
      href="http://localhost:3000/auth/reset-password?token=${token}"
      class="reset-button"
    >
      Reset password
    </a>
    <p class="message">
      If you were not expecting this email, please ignore this message.
    </p>
    <p class="message">
      Thanks,<br />
      <a class="signature-link" href="https://www.ceevee.ai" target="_blank"
        >CeeVee</a
      >
    </p>
  </div>
</body>
</html>`;

    await sendMail({
        email: `${email}`,
        subject: 'Reset Password',
        message: resetUrl,
    });

    res.status(200).json({ message: 'Email sent' });
};

const resetPassword = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: ' no ceevee_accesstoken Unauthorized' });
        return;
    }
    // Get the hashed token from the request parameters
    const decodedToken = verifyAuthToken(token) as { id: string };

    // Find the user in the database
    const user = await CeeveeUser.findById(decodedToken.id);

    if (!user) {
        res.status(400).json({ message: 'Invalid user' });
        return;
    }
    // hash password
    const hashedPassword = await saltHashPassword(req.body.password);

    // Set the new password
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    // Send a response with a message
    res.status(200).json({ message: 'Your password has been reset successfuly' });
};

const updateUsername = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username } = req.body;
        // Get the token from the request headers
        const ceevee_accesstoken = req.headers.authorization?.split(' ')[1];

        if (!ceevee_accesstoken) {
            res.status(401).json({ message: ' no ceevee_accesstoken Unauthorized' });
            return;
        }

        const decoded = verifyAuthToken(ceevee_accesstoken) as { id: string };

        // Retrieve user data from the database based on the ceevee_id
        let user = await CeeveeUser.findById(decoded.id).select('-password');

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Update the username
        user.username = username;
        await user.save();
        user = user.toObject();
        // user = user.lean() TODOAUTH why doesnt it work

        // Send a response with a message
        res.status(200).json({ message: 'Username updated successfully', user });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};
const updatePassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { password, newPassword } = req.body;
        // Get the token from the request headers
        const ceevee_accesstoken = req.headers.authorization?.split(' ')[1];

        if (!ceevee_accesstoken) {
            res.status(401).json({ message: ' no ceevee_accesstoken Unauthorized' });
            return;
        }

        const decoded = verifyAuthToken(ceevee_accesstoken) as { id: string };

        // Retrieve user data from the database based on the ceevee_id
        const user = await CeeveeUser.findById(decoded.id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Check if the current password is correct
        const isPasswordCorrect = await comparePassword(password, user.password as string);

        if (!isPasswordCorrect) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        // hash password
        const hashedPassword = await saltHashPassword(newPassword);
        // Update the password
        user.password = hashedPassword;
        await user.save();

        // Send a response with a message
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default getUserDataController;
export { getUserDataController, addUser, loginUser, forgotPassword, resetPassword, updatePassword, updateUsername };

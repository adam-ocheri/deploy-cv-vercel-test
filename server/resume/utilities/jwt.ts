/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';

export const getAuthToken = (id: string, expiryTime: string): string => {
    return jwt.sign({ id }, String(process.env.JWT_SECRET), {
        expiresIn: expiryTime,
    });
};

export const verifyAuthToken = (token: string): string | object => {
    return jwt.verify(token, String(process.env.JWT_SECRET));
};

import jwt from 'jsonwebtoken';
import { env } from '../../../lib/config/env.js';

export function accessToken(payload) {
    return jwt.sign(
        payload,
        env.jwt.accessScret,
        { expiresIn: '15m' }
    );
}

export function refreshToken(payload) {
    return jwt.sign(
        payload,
        env.jwt.refreshScret,
        { expiresIn: '7d' }
    );
}

export function generateToken(payload) {
    return {
        accessToken: accessToken(payload),
        refreshToken: refreshToken(payload)
    };
}

export function generatedToken(token) {
    const payload = jwt.verify(
        token,
        env.jwt.refreshScret
    );

    return generateToken({
        id: payload.id,
        role: payload.role,
        name: payload.name,
        email: payload.email
    });
}

import jwt from 'jsonwebtoken';
import { useCookies } from 'react-cookie';

export default function useJWT() {
  const [cookies] = useCookies(['jwt']);
  try {
    const token = cookies.jwt;
    if (token)
      return jwt.decode(token);
  } catch (err) {
    console.error('useJWT error:', err);
  }
  return null;
};
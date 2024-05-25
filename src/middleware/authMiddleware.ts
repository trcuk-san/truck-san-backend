import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken {
  uid: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload ;
    (req as any).user = decoded; // เพิ่ม user property ลงใน req โดยใช้ type assertion
    req.session.uid = decoded.uid;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
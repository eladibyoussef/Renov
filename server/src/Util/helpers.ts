import jwt from 'jsonwebtoken';
import { Request } from 'express';


export    const extractTokenPayload = (req: Request): any | null => {
    const authHeader = req.headers.authorization;
    const secret:string = process.env.SECRET || '155fgnknbdg5dthrth'
    if (!authHeader) {
      return null; 
    }
  
    const token = authHeader.split(' ')[1];
    if (!token) {
      return null; 
    }
  
    try {
      const payload = jwt.verify(token, secret  ); 
      console.log(payload);
      
      return payload;
    } catch (error:any) {
      console.error('Error decoding token:', error.message);
      return null; 
    }
  }; 
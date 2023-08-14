export const isUser = ( req, res, next ) => {
    if (req.user.role != 'user' ) res.status(403).json({ message: 'User not exist' });
    next();
}
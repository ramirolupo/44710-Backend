export const isAuth = ( req, res, next) => {
    if (!req.isAuthenticated()) res.status(401).json({ message: 'User not Authenticated' });
    next();
}
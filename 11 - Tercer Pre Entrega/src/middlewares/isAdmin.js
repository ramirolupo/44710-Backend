export const isAdmin = ( req, res, next ) => {
    if (req.req.user.role != 'admin' ) res.status(403).json({ message: 'User not Admin' });
    next();
}
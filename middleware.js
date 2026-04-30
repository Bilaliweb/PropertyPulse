// A middleware line for whole project and not even a single route can be accessed
export { default } from 'next-auth/middleware';

// If specific routes are desired to be protected, we have to add config as follows.
export const config = {
    matcher: ['/properties/add', '/profile', '/properties/saved', '/messages']
}
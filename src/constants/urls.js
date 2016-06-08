let root = 'http://ramon-james.com'

if (process.env.NODE_ENV === 'production') {
  root = 'http://ramon-james.com'
}

export const MAIN = `${root}/wordpress/wp-json/`
export const HOME = `${root}/wordpress/wp-json/pages/home`
export const ABOUT = `${root}/wordpress/wp-json/pages/about`
export const POSTS = `${root}/wordpress/wp-json/posts/`
export const CONTACT = `${root}/wordpress/wp-json/pages/contact`

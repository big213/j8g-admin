export const siteName = process.env.siteName
export const siteDescription = process.env.siteDescription
export const siteImageUrl = process.env.siteImageUrl
export const siteContactEmail = process.env.siteContactEmail
export const siteDiscordLink = process.env.siteDiscordLink
export const siteGithubRepositoryUrl = process.env.siteGithubRepositoryUrl
export const logoHasLightVariant = process.env.logoHasLightVariant
export const defaultGridView = process.env.defaultGridView
export const defaultLightMode = process.env.defaultLightMode
export const socialLoginEnabled = process.env.socialLoginEnabled
export const tempStoragePath = process.env.tempStoragePath
export const isDev = process.env.isDev

export const firebaseConfig = {
  apiKey: 'AIzaSyBK-rvJXdCeOQ4pnfA9wikUTwO0Ifw20eU',
  authDomain: 'j8g-admin.firebaseapp.com',
  projectId: 'j8g-admin',
  storageBucket: 'j8g-admin.appspot.com',
  messagingSenderId: '287340072520',
  appId: '1:287340072520:web:cb92e8149c77ebed82527d',
}

export const routesMap = {
  view: {
    a: ['apiKey', 'file', 'user', 'userUserFollowLink'],
    i: ['user'],
    my: ['apiKey', 'file'],
    s: [],
  },
  crud: {
    a: ['apiKey', 'file', 'user', 'userUserFollowLink'],
    i: ['user'],
    my: ['apiKey', 'file'],
    s: [],
  },
}

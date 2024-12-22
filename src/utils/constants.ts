export const PUBLIC_PATH =
  window.location.hostname === 'ovrdrve.github.io'
    ? process.env.PUBLIC_PATH
    : '/';

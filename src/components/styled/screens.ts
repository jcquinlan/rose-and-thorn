export const ScreenSizes = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
};

export const devices = {
  mobileS: `(min-width: ${ScreenSizes.mobileS})`,
  mobileM: `(min-width: ${ScreenSizes.mobileM})`,
  mobileL: `(min-width: ${ScreenSizes.mobileL})`,
  tablet: `(min-width: ${ScreenSizes.tablet})`,
  laptop: `(min-width: ${ScreenSizes.laptop})`,
  laptopL: `(min-width: ${ScreenSizes.laptopL})`,
  desktop: `(min-width: ${ScreenSizes.desktop})`,
  desktopL: `(min-width: ${ScreenSizes.desktop})`
};

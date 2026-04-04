const DEFAULT_AVATAR = require('../assets/icon.png');

export function getImageSource(uri) {
  if (!uri) {
    return DEFAULT_AVATAR;
  }
  if (uri.startsWith('http')) {
    return { uri };
  }
  if (uri.startsWith('file://') || uri.startsWith('content://')) {
    return { uri };
  }
  if (uri.startsWith('data:image')) {
    return { uri };
  }
  return { uri: 'data:image/png;base64,' + uri };
}

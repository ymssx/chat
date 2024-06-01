export function getHashQuery<T extends { [key: string]: string }>(hash: string = location.hash): T {
  return hash.replace('#', '').split('&').reduce((pre, item) => ({
    ...pre,
    [item.split('=')[0]]: decodeURIComponent(item.split('=')[1]),
  }), {}) as T;
}
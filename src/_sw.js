// workbox-webpack-plugin 4.x (ex 4.3.1) only using by InjectManifest in workbox-webpack-plugin
if ("workbox" in self) {
  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
}

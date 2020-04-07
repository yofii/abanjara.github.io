const getWebmentions = require('../../lib/utils/get-webmentions');

module.exports = {
  eleventyComputed: {
    page_title: data => `${data.title} · ${data.app.title}`,
    canonical_url: data => {
      if (data.canonical && data.canonical.url) {
        return data.canonical.url;
      }

      return data.app.url + data.page.url;
    },
    share_image: data => {
      const {image} = data;
      if (image) {
        return `https://res.cloudinary.com/paulrobertlloyd/image/fetch/c_fill,f_auto,q_auto,w_1200,h_630/${data.app.url}${image}`;
      }

      return data.app.url + data.app.icon;
    },
    webmentions: data => {
      const url = data.app.url + data.page.url;
      return getWebmentions(data.webmentions.children, url);
    }
  }
};

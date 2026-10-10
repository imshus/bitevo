// Food photos are served from Unsplash (free Unsplash License). Swap the ids for your own photos later.
export const photo = (id, w, h, q = 75) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=${q}&auto=format`;

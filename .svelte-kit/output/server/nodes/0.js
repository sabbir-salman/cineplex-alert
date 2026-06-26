

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DSI9oeAQ.js","_app/immutable/chunks/C-uQHxWH.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = [];
export const fonts = [];

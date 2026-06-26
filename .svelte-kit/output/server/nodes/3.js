

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.qAGgzMWq.js","_app/immutable/chunks/C-uQHxWH.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = [];
export const fonts = [];

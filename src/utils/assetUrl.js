// Legacy asset imports resolve to {src}/{default} shapes; the _app patch
// normalizes component props (ReactSVG's src) but not a plain <a href>.
// Use this wherever an imported asset ends up in a raw attribute.
export const assetUrl = (asset) =>
    typeof asset === 'string' ? asset : asset?.src || asset?.default || '';

export default assetUrl;

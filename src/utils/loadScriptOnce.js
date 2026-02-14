const scriptPromises = new Map();

const hasWindow = typeof window !== 'undefined';

const resolveExistingScript = (src) => {
  if (!hasWindow) return null;
  return document.querySelector(`script[src="${src}"]`);
};

export const loadScriptOnce = (src) => {
  if (!hasWindow) {
    return Promise.resolve();
  }

  if (scriptPromises.has(src)) {
    return scriptPromises.get(src);
  }

  const existing = resolveExistingScript(src);
  if (existing) {
    const readyState = existing.getAttribute('data-loaded');
    if (readyState === 'true') {
      const resolved = Promise.resolve();
      scriptPromises.set(src, resolved);
      return resolved;
    }

    const pending = new Promise((resolve, reject) => {
      existing.addEventListener('load', () => {
        existing.setAttribute('data-loaded', 'true');
        resolve();
      });
      existing.addEventListener('error', () => reject(new Error(`Failed to load script: ${src}`)));
    });
    scriptPromises.set(src, pending);
    return pending;
  }

  const script = document.createElement('script');
  script.src = src;
  script.async = true;

  const pending = new Promise((resolve, reject) => {
    script.addEventListener('load', () => {
      script.setAttribute('data-loaded', 'true');
      resolve();
    });
    script.addEventListener('error', () => reject(new Error(`Failed to load script: ${src}`)));
  });

  scriptPromises.set(src, pending);
  document.body.appendChild(script);
  return pending;
};

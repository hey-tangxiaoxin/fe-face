const loadCjs = (code: string, deps: Record<string, unknown>) => {
  const exports = {};
  const module = { exports };
  const require = (name: string) => {
    return deps[name];
  };
  new Function("module", "exports", "require", code)(module, exports, require);
  return module.exports;
};

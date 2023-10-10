const getPath: any = (object: any, search: any) => {
  if (object.key === search) return [object.key];
  else if (object.children || Array.isArray(object)) {
    let children = Array.isArray(object) ? object : object.children;
    for (let child of children) {
      let result = getPath(child, search);
      if (result) {
        if (object.key) result.unshift(object.key);
        return result;
      }
    }
  }
};
export { getPath };

const validateHtmlEditor = (validator: any, value: string) => {
  if (validator.required) {
    let parser = new DOMParser();
    const doc = parser.parseFromString(value, "text/html");
    const p = doc.getElementsByTagName("p");
    if (!value || value == "") {
      return Promise.reject();
    } else return Promise.resolve();
  } else return Promise.resolve();
};
export { validateHtmlEditor };

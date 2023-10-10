const validateTextAndNumber = async (validator: any, value: string) => {
  if (validator.required) {
    if (!value || value == "") {
      return Promise.reject();
    } else {
      var letterNumber = /^[0-9a-zA-Z]+$/;
      let valid = await value.match(letterNumber);
      if (valid) {
        return Promise.resolve();
      } else return Promise.reject();
    }
  } else return Promise.resolve();
};
export { validateTextAndNumber };

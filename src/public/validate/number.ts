const validateNumber = (validator: any, value: number) => {
  if (validator.required || value) {
    if (
      validator.min != null &&
      validator.min != undefined &&
      validator.max != null &&
      validator.max != undefined
    ) {
      if (validator.min <= value && value <= validator.max) {
        return Promise.resolve();
      } else return Promise.reject();
    } else if (validator.min != null && validator.min != undefined) {
      if (validator.min <= value) {
        return Promise.resolve();
      } else return Promise.reject();
    } else if (validator.max != null && validator.max != undefined) {
      if (validator.max >= value) {
        return Promise.resolve();
      } else return Promise.reject();
    } else return Promise.resolve();
  } else return Promise.resolve();
};
export { validateNumber };

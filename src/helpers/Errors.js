class Errors {
  constructor() {
    this.errors = {};
  }

  get(field) {
    const error = this.errors[field];
    if (error) {
      return error.toString();
    }
  }

  record(errors) {
    this.errors = errors;
  }

  clear(field) {
    delete this.errors[field];
    delete this.errors['generic'];
  }

  has(field) {
    return this.errors.hasOwnProperty(field);
  }

  any() {
    return Object.keys(this.errors).length > 0;
  }
}

export default Errors;

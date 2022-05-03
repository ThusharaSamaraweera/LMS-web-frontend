const validation = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.fName) {
      errors.fName = "Firstname is required!";
    }
    if (!values.lName) {
        errors.fName = "Lastname is required!";
    }
    if (!values.department) {
        errors.department = "Department is required!";
    }
    if (!values.studentId) {
        errors.studentId = "StudentId is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    return errors;
};

export default validation;

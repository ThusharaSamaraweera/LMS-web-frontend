const validation = (values) => {
    const errors = {};

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      errors.firstName = "Firstname is required!";
    }
    if (!values.lastName) {
        errors.lastName = "Lastname is required!";
    }
    if (!values.department) {
        errors.department = "Department is required!";
    }
    if (!values.studentId) {
        errors.studentId = "StudentId is required!";
    }
    
    return errors;
};

export default validation;

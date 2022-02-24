export default function ValidateInfo(values) {
    
    //Validate register form
    let errors = {}

    //check all inputs is not null
    //check firstname is only String
    if(!values.firstName){
        errors.firstName = "Please input your first name"
    }else if(/[^a-zA-Z\s]/.test(values.firstName)){
        errors.firstName = "Plese input only characters"
    }

    //check firstname is only String
    if(!values.lastName){
        errors.lastName = "Please input your last name"
    }else if(/[^a-zA-Z-\s]/.test(values.lastName)){
        errors.lastName = "Plese input only characters"
    }
    
    //check format e-mail
    if(!values.email){
        errors.email = "Please input your E-mail";
    }else if(!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'E-mail is invalid';
    }

    //check password must be 6 characters or more
    if (!values.password) {
        errors.password = 'Please input your password';
    } else if (values.password.length < 6) {
        errors.password = 'Password needs to be 6 characters or more';
    }
    
    //check confirm password match password
    if (!values.cfpassword) {
        errors.cfpassword = 'Please confirm your password';
    } else if (values.cfpassword !== values.password) {
        errors.cfpassword = 'Passwords do not match';
    }
    // console.log(errors);

    return errors;
}
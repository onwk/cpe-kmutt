export default function ValidateInfo(values) {
    
    //Validate register form
    let errors = {}

    //check all inputs is not null
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

    return errors;
}
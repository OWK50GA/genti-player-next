import * as yup from 'yup';

export const loginValidation = yup.object().shape({
    email: yup
        .string()
        .email('Invalid Email')
        .required('Email is required')
        /*eslint no-useless-escape: 0*/
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid Email')
    ,
    password: yup.string().required('Password is required'),
});


export const registerValidation = yup.object().shape({
    name: yup
        .string()
        .required('Name is required'),
    dob: yup
        .string()
        .required('Field is required'),
    gender: yup
        .string()
        .required('Field is required'),
    // country_id: yup
    //     .string()
    //     .required('Country code is required'),
    // mobile_number: yup
    //     .string()
    //     .required('Phone number is required'),
    email: yup
        .string()
        .email('Invalid Email')
        .required('Email is required')
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid Email'),

    /*eslint no-useless-escape: 0*/

    password: yup
        .string()
        .required('Password is required')
        .matches(/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/, 'Password must have at least one capital letter, one small letter,one number, and minimum of 8 letters ')
    // .matches(/^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+*!=]).*$/, 'Password must have at least one capital letter, one small letter,one number, one special character, and minimum of 6 letters ')
    ,
});


export const forgotPasswordValidation = yup.object().shape({
    verify: yup
        .string()
        .email('Invalid Email')
        .required('Email is required')
        /*eslint no-useless-escape: 0*/
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid Email')

});


export const resetPasswordValidation = yup.object().shape({
    new_password: yup
        .string()
        .required('Password is required')
        .matches(/^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+*!=]).*$/, 'Password must have at least one capital letter, one small letter,one number, one special character, and minimum of 6 letters ')
    ,
    confirm_password: yup
        .string()
        .oneOf([yup.ref('new_password'), null], 'Passwords doesn\'t match')

});

export const rssUploadValidation = yup.object().shape({
    rss: yup
        .string()
        .required('RSS link is required')
        .matches(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/, 'Invalid RSS url')
    ,
    type_id: yup
        .string()
        .required('RSS type is required')
});


export const metadataValidation = yup.object().shape({
    author_description: yup
        .string()
        .required('Author description is required'),
    authors: yup
        .string()
        .required('Authors is required'),
    description: yup
        .string()
        .required('Description is required'),
    genre: yup
        .string()
        .required('Genre is required'),
    language: yup
        .string()
        .required('Language is required'),
    narrators: yup
        .string()
        .required('Narrator is required'),
    // publishers: yup
    //     .string()
    //     .required('Publisher is required'),
    sub_genre: yup
        .string()
        .required('Sub genre is required'),
    title: yup
        .string()
        .required('Title is required'),
    type_id: yup
        .string()
        .required('RSS type is required')
});
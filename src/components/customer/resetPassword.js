import React from 'react'
import { connect } from 'react-redux';
import {recoverPassword} from '../../store/actions/customerActions'
import Sidebar from './sidebar'
import {Card} from 'react-bootstrap'
import * as Yup from 'yup'
import { Formik, Field } from 'formik'
import MessageCard from './MessageCard'

const RecoverSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email.')
      .required('The email is required.'),
  });

const ResetPassword =({error,loading,sendEmail,cleanUp})=>{
  
    // useEffect(() => {
    //     return () => {
    //       cleanUp();
    //     };
    //   }, [cleanUp]);
    
      return (
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={RecoverSchema}
          onSubmit={async (values, { setSubmitting }) => {
           console.log(values)
            await sendEmail(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid }) => (
              <div className='container'>
                  <br/> <br/> <br/> <br/> <br/> <br/>
                <h1 noMargin size="h1" color="white">
                Recover your password
              </h1>
              <h3 size="h4" bold color="white">
                Type in your e-mail to recover your password
              </h3>
                {/* <Field
                  type="email"
                  name="email"
                  placeholder="Type your email..."
                  component={Input}
                /> */}
                <input  type="email" name="email" placeholder="Type your email..." required></input>
                <button
                  disabled={!isValid || isSubmitting}
                  loading={loading ? 'Sending recover email...' : null}
                  type="submit"
                >
                  Recover email
                </button>
                  <p error show={error}>
                    {error}
                  </p>
                  <p success show={error === false}>
                    Recover email sent successfully!
                  </p>
              </div>
              
         
          )}
        </Formik>
      );
}
// const mapStateToProps = ({ auth }) => ({
//     loading: auth.recoverPassword.loading,
//     error: auth.recoverPassword.error,
//   });
  
//   const mapDispatchToProps =()=> ({
//     sendEmail:recoverPassword,
//     // cleanUp:clean
//   });
  
//   export default connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(ResetPassword);
 export default ResetPassword;

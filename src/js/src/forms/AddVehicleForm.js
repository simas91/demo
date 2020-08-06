import React from 'react';
import { Formik } from 'formik';
import { Input, Button, Tag } from 'antd';
import { addNewVehicle } from '../client';

const inputBottomMargin = {marginBottom: '5px'};
const tagStyle = {backgroundColor: '#f50', color: 'white', ...inputBottomMargin};

const AddVehicleForm = (props) => (
     <Formik

       initialValues={{ registration: '', manufacturer: '', model: '', year: '', hpiClear: ''}}

       validate={values => {

         const errors = {};

         if (!values.registration) {

           errors.registration = 'Registration number required';

         } else if (

           !/^[A-Z]{2}[0-9]{2}[A-Z]{3}$/i.test(values.registration)

         ) {

           errors.registration = 'Invalid registration number';

         }

         if (!values.manufacturer) {

          errors.manufacturer = 'Manufacturer required';

        }

        if (!values.model) {

          errors.model = 'Model required';

        }

        if (!values.year) {

          errors.year = 'Year required';

        }else if (

          !/^[0-9]{4}$/i.test(values.year) | values.year < 1950 | values.year > 2022

        ) {

          errors.year = 'Invalid year';

        }

        if (!values.hpiClear) {

          errors.hpiClear = 'HPI clearance required';

        } else if (!['NO', 'no', 'YES', 'yes'].includes(values.hpiClear)
        ) {
            errors.hpiClear = 'HPI clearance must be (YES, yes, NO, no)';
        }

         return errors;

       }}

       onSubmit={(vehicle, { setSubmitting }) => {
              addNewVehicle(vehicle).then(() => {
                props.onSuccess();
            })
            .catch(err => {
              props.onFailure(err);
            })
            .finally(() => {
              setSubmitting(false);
            })
       }}>

       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         submitForm,
         isValid

         /* and other goodies */

       }) => (

         <form onSubmit={handleSubmit}>

          <Input

            style={inputBottomMargin}

            name="registration"

            onChange={handleChange}

            onBlur={handleBlur}

            value={values.registration}

            placeholder='Registration number'

            />

       {errors.registration && touched.registration && <Tag style={tagStyle}>{errors.registration}</Tag>}


           <Input

             style={inputBottomMargin}

             name="manufacturer"

             onChange={handleChange}

             onBlur={handleBlur}

             value={values.manufacturer}

             placeholder='Manufacturer of car'

           />

           {errors.manufacturer && touched.manufacturer && <Tag style={tagStyle}>{errors.manufacturer}</Tag>}

           <Input

             style={inputBottomMargin}

             name="model"

             onChange={handleChange}

             onBlur={handleBlur}

             value={values.model}

             placeholder='Model of car'

           />

           {errors.model && touched.model && <Tag style={tagStyle}>{errors.model}</Tag>}

           <Input

             style={inputBottomMargin}

             name="year"

             onChange={handleChange}

             onBlur={handleBlur}
 
             value={values.year}

             placeholder='Year made'

            />

            {errors.year && touched.year && <Tag style={tagStyle}>{errors.year}</Tag>}

            <Input

             style={inputBottomMargin}

             name="hpiClear"

             onChange={handleChange}
 
             onBlur={handleBlur}

             value={values.hpiClear}

             placeholder='Is HPI clear?'

            />

            {errors.hpiClear && touched.hpiClear && <Tag style={tagStyle}>{errors.hpiClear}</Tag>}

           <Button 
            onClick={() => submitForm()} 
            type="submit" 
            disabled={isSubmitting | (touched && !isValid)}>
             Submit

           </Button>

         </form>

       )}

     </Formik>

        );

export default AddVehicleForm;
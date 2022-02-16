import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import {
  Message,
  Label,
  SubmitButton,
  FormContainer,
} from "./ContactForm.styled";

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.number().required().positive().integer(),
});

export default class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  handleSubmit = ({ name, number }, { resetForm }) => {
    this.setState({ name: name, number: number });
    this.props.onSubmit(this.state);
    resetForm();
  };

  render() {
    return (
      <Formik
        initialValues={{ name: "", number: "" }}
        onSubmit={this.handleSubmit}
        validationSchema={schema}
      >
        <FormContainer>
          <Form autoComplete="off">
            <div>
              <Label htmlFor="name">Name</Label>
              <Field type="text" name="name" />
              <ErrorMessage
                name="name"
                render={(message) => (
                  <Message>
                    Name may contain only letters, apostrophe, dash and spaces.
                    For example Adrian, Jacob Mercer, Charles de Batz de
                    Castelmore d'Artagnan
                  </Message>
                )}
              />
            </div>
            <div>
              <Label htmlFor="tel">Number</Label>
              <Field type="tel" name="number" />
              <ErrorMessage
                name="number"
                render={(message) => (
                  <Message>
                    Phone number must be digits and can contain spaces, dashes,
                    parentheses and can start with +
                  </Message>
                )}
              />
            </div>
            <SubmitButton type="submit">Add contact</SubmitButton>
          </Form>
        </FormContainer>
      </Formik>
    );
  }
}

import React, {  useState } from "react";
import Contacts from "./components/Contacts";
import axios from "axios";
import emailValidator from "../../../utils/EmailValidator";
import { v4 as uuidv4 } from "uuid";

const ContactsContainer = () => {
  const [formState, setFormState] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formStateError, setFormStateError] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleInput = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    let isValid = true;
    let nameError = "";
    let surnameError = "";
    let emailError = "";
    let phoneError = "";
    let messageError = "";
    if (!formState.name.length || formState.name.length <= 1) {
      isValid = false;
      nameError = "Моля въведете вашето име";
    }
    if (!formState.surname.length || formState.surname.length <= 1) {
      isValid = false;
      surnameError = "Моля въведете вашата фамилия";
    }
    if (
      !formState.email.length ||
      formState.email.length < 1 ||
      !emailValidator(formState.email)
    ) {
      isValid = false;
      emailError = "Моля въведете валиден имейл";
    }
    if (formState.phone.length < 10 || formState.phone.length > 10) {
      isValid = false;
      phoneError = "Моля въведете вашия телефонен номер";
    }
    if (!formState.message.length || formState.message.length <= 1) {
      isValid = false;
      messageError = "Моля въведете вашия коментар";
    }
    setFormStateError({
      ...formStateError,
      name: nameError,
      surname: surnameError,
      message: messageError,
      phone: phoneError,
      email: emailError,
    });
    return isValid;
  };
  const resetForm = () => {
    setFormStateError({
      name: "",
      surname: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleSubmit = () => {
    let isContactFormValid = validateForm();

    if (!isContactFormValid) {
      return;
    }

    resetForm();
    let contact = {
      id: uuidv4(),
      name: formState.name,
      surname: formState.surname,
      email: formState.email,
      phone: parseInt(formState.phone),
      message: formState.message,
    };
    axios
      .post(`http://localhost:4000/contacts`, { contact })
      .then((res) => {
        setSuccessMessage(
          "Вие успешно изпратихте вашето запитване! Ще изпратим нашия отговор, възможно най-бързо, към вашия имейл!"
        );
        setFormState({
          name: "",
          surname: "",
          email: "",
          phone: "",
          message: "",
        });
      })
      .catch((e) => console.error(e));
  };
  return (
    <Contacts
      handleSubmit={handleSubmit}
      formState={formState}
      successMessage={successMessage}
      formStateError={formStateError}
      handleInput={handleInput}
    />
  );
};

export default ContactsContainer;

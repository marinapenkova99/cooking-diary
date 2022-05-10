import React from "react";
import "./ContactsStyle.css";
import OrangeButton from "../../../../packages/buttons/orangeButton/OrangeButton";
import { H1, Label } from "../../../../packages/text/Text";
import Input from "../../../../packages/input/Input";
import Textarea from "../../../../packages/textarea/Textarea";

const Contacts = ({
  formState,
  handleInput,
  handleSubmit,
  successMessage,
  formStateError,
}) => {
  return (
    <section className="contacts_section">
      <img src={"/contacts.png"} alt="about-us" />
      <div className="contacts_section_content">
        <H1 h1={"Свържете се с нас"} />
        <div className="contact_form">
          <div className="row">
            <div className="col-6">
              <Label label={"Име"} />
              <Input
                name={"name"}
                error={formStateError.name}
                handleInput={handleInput}
                type={"text"}
                value={formState.name}
              />
            </div>
            <div className="col-6">
              <Label label={"Фамилия"} />
              <Input
                name={"surname"}
                error={formStateError.surname}
                handleInput={handleInput}
                type={"text"}
                value={formState.surname}
              />
            </div>
          </div>{" "}
          <div className="row">
            <div className="col-6">
              <Label label={"Имейл"} />
              <Input
                name={"email"}
                error={formStateError.email}
                handleInput={handleInput}
                type={"text"}
                value={formState.email}
              />
            </div>
            <div className="col-6">
              <Label label={"Телефон"} />
              <Input
                name={"phone"}
                error={formStateError.phone}
                handleInput={handleInput}
                type={"number"}
                value={formState.phone}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Label label={"Съобщение"} />
              <Textarea
                value={formState.message}
                handleInput={handleInput}
                error={formStateError.message}
                name={"message"}
              />
            </div>
          </div>
          <div className="btn_wrapper">
            <OrangeButton onClick={handleSubmit} text={"Изпрати"} />
          </div>
          <p className="success">{successMessage}</p>
        </div>
      </div>
    </section>
  );
};

export default Contacts;

import React from "react";
import "./DeleteModalStyle.css";
import { Modal } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const DeleteModal = ({ isModalOpen, closeModal, deleteData }) => {
  return (
    <Modal show={isModalOpen} onHide={closeModal}>
      <ModalHeader>
        <div style={{ width: "100%", textAlign: "right" }}>
          <FontAwesomeIcon onClick={closeModal} icon={faTimes} />
        </div>
      </ModalHeader>
      <div className="modal_content_holder">
        <p className="modal_body_text">
          Сигурни ли сте, че искате да изтриете този запис?{" "}
        </p>
        <div className="btns_holder">
          <button className="cancel" onClick={closeModal}>
            Откажи
          </button>
          <button className="delete" onClick={deleteData}>
            Изтрий
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;

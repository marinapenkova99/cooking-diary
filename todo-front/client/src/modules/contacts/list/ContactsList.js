import React, { useEffect, useState } from "react";
import UserLayout from "../../../packages/userLayout/UserLayout";
import DeleteModal from "./../../../packages/modals/DeleteModal";
import axios from "axios";
import ListRow from "../../../packages/listRow/ListRow";

const ContactsList = (props) => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedContactToDelete, setSelectedContactToDelete] = useState("");
  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:4000/contacts`)
      .then((res) => {
        setContacts(res.data);
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
  };
  const deleteContact = (contact) => {
    axios.delete(`http://localhost:4000/contacts/${contact}`).then((res) => {
      window.location.reload();
    });
    window.location.reload();
  };

  const toggleDeleteModal = (contact) => {
    setIsOpenDeleteModal(!isOpenDeleteModal);
    setSelectedContactToDelete(contact);
  };
  const tableCells = (cell, index) => {
    return (
      <>
        <td> {index + 1}</td>
        <td>{cell.name}</td>
        <td>{cell.surname}</td>
        <td>{cell.phone}</td>
        <td>{cell.email}</td>
      </>
    );
  };
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="page_wrapper">
      <UserLayout>
        <ListRow
          dataList={contacts}
          listRowTitle={"Контакти"}
          toggleDeleteModal={toggleDeleteModal}
          isEditable={false}
          tableCells={tableCells}
          tableHeads={["#", "Име", "Фамилия", "Телефон", "Имейл", "Опции"]}
        />
      </UserLayout>
      {isOpenDeleteModal === true && (
        <DeleteModal
          isModalOpen={isOpenDeleteModal}
          closeModal={() => toggleDeleteModal(selectedContactToDelete)}
          deleteData={() => deleteContact(selectedContactToDelete)}
        />
      )}
    </div>
  );
};

export default ContactsList;

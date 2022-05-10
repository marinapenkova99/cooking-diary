import React, { useEffect, useState } from "react";
import axios from "axios";
import UserLayout from "../../packages/userLayout/UserLayout";
import DeleteModal from "../../packages/modals/DeleteModal";
import ListRow from "../../packages/listRow/ListRow";

const NewsletterEmailsList = () => {
  const [emails, setEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedEmailToDelete, setSelectedEmailToDelete] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getEmails();
  }, []);

  const getEmails = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:4000/emails`)
      .then((res) => {
        setEmails(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const deleteEmail = (email) => {
    axios.delete(`http://localhost:4000/emails/${email}`).then((res) => {
      setSuccess("Вие успешно изтрихте абонат");
    });
    window.location.reload();
  };

  const toggleDeleteModal = (email) => {
    setIsOpenDeleteModal(!isOpenDeleteModal);
    setSelectedEmailToDelete(email);
  };
  const tableCells = (cell, index) => {
    return (
      <>
        <td> {index + 1}</td>
        <td>{cell.email}</td>
      </>
    );
  };
  if (isLoading) return null;
  return (
    <div className="page_wrapper">
      <UserLayout>
        <ListRow
          dataList={emails}
          listRowTitle={"Абонаменти"}
          toggleDeleteModal={toggleDeleteModal}
          isEditable={false}
          tableCells={tableCells}
          tableHeads={["#", "Имейл", "Опции"]}
        />
        {success && (
          <p style={{ textAlign: "right" }} className="success">
            {success}
          </p>
        )}
      </UserLayout>
      {isOpenDeleteModal === true && (
        <DeleteModal
          isModalOpen={isOpenDeleteModal}
          closeModal={() => toggleDeleteModal(selectedEmailToDelete)}
          deleteData={() => deleteEmail(selectedEmailToDelete)}
        />
      )}
    </div>
  );
};

export default NewsletterEmailsList;

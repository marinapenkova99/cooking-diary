import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteModal from "./../../../packages/modals/DeleteModal";
import UserLayout from "../../../packages/userLayout/UserLayout";
import ListRow from "../../../packages/listRow/ListRow";
import moment from "moment";

const UserProfileRecipesListContainer = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedTaskToDelete, setSelectedTaskToDelete] = useState(0);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/recipes`)
      .then((res) => {
        setRecipes(res.data);
        setLoading(false);
      })
      .catch((e) => console.error(e));
  };
  const deleteTask = (id) => {
    axios.delete(`http://localhost:4000/recipes/${id}`).then((res) => {
      setRecipes(res.data);
    });
    window.location.reload();
  };

  const toggleDeleteModal = (id) => {
    setIsOpenDeleteModal(!isOpenDeleteModal);
    setSelectedTaskToDelete(id);
  };
  const tableCells = (cell, index) => {
    return (
      <>
        <td> {index + 1}</td>
        <td>
          <img src={cell.image} alt="task" />
          {cell.title}
        </td>
        <td>
          {cell.Date === null
            ? ""
            : moment.unix(cell.Date).format("DD.MM.YYYY")}
        </td>
      </>
    );
  };
  if (isLoading) return null;
  return (
    <div className="page_wrapper">
      <UserLayout>
        <ListRow
          dataList={recipes}
          listRowTitle={"Моите рецепти"}
          isEditable={true}
          toggleDeleteModal={toggleDeleteModal}
          tableHeads={["Id", "Заглавие", "Дата", "Опции"]}
          tableCells={tableCells}
          editableLink={`/my_profile/recipe`}
        />
      </UserLayout>
      {isOpenDeleteModal === true && (
        <DeleteModal
          isModalOpen={isOpenDeleteModal}
          closeModal={() => toggleDeleteModal(selectedTaskToDelete)}
          deleteData={() => deleteTask(selectedTaskToDelete)}
        />
      )}
    </div>
  );
};

export default UserProfileRecipesListContainer;

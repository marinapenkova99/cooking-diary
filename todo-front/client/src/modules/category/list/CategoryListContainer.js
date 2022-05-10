import React, { useEffect, useState } from "react";
import axios from "axios";
import UserLayout from "../../../packages/userLayout/UserLayout";
import ListRow from "../../../packages/listRow/ListRow";

const CategoryListContainer = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:4000/category/`)
      .then((res) => {
        setCategories(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const tableCells = (cell, index) => {
    return (
      <>
        <td> {index + 1}</td>
        <td>{cell.name}</td>
      </>
    );
  };
  if (isLoading) return null;
  return (
    <div className="page_wrapper">
      <UserLayout>
        <ListRow
          dataList={categories}
          listRowTitle={"Моите категории"}
          isEditable={true}
          tableHeads={["Id", "Име", "Опции"]}
          tableCells={tableCells}
          editableLink={`/my_profile/category`}
        />
      </UserLayout>
    </div>
  );
};

export default CategoryListContainer;

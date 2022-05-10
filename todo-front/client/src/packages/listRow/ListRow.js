import React from "react";
import "./ListRoleStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ListRow = ({
  dataList,
  tableHeads,
  tableCells,
  toggleDeleteModal,
  isEditable,
  listRowTitle,
  editableLink,
}) => {
  return (
    <>
      <h2 className="user_profile_list_title">{listRowTitle}</h2>
      <table className="task">
        <thead>
          <tr>
            {tableHeads.map((tableHead, index) => {
              return <th key={index}>{tableHead}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {dataList.map((data, index) => {
            return (
              <tr style={{ fontSize: 20, padding: 15 }} key={index}>
                {tableCells(data, index)}
                <td>
                  {toggleDeleteModal && (
                    <FontAwesomeIcon
                      className="delete"
                      onClick={() => toggleDeleteModal(data.id)}
                      icon={faTrash}
                    />
                  )}
                  {isEditable === true && (
                    <Link to={`${editableLink}/${data.title || data.id}`}>
                      <FontAwesomeIcon className="edit" icon={faEdit} />{" "}
                    </Link>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ListRow;

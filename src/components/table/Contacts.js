import React from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const Contacts = ({
  data,
  setData,
  setUpdate,
  setInfo,
  mainUrl,
  setRefresh,
  refresh,
}) => {
  const handleDelete = async (id) => {
    try {
      const res = await axios({ method: "delete", url: `${mainUrl}${id}/` });
      setRefresh(!refresh);
    } catch (error) {
      console.log(error.message);
    }
  };

  const editUser = (id, username, phone_number, gender) => {
    setUpdate(true);
    setInfo({ id, username, phone_number, gender });
  };

  return (
    <div>
      <h2 className="contact-header">Contacts</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell align="left">Phone Number</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="left">Delete</TableCell>
              <TableCell align="left">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length === 0 ? (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell colSpan={5} align="center">
                  NO RESULT FOUND
                </TableCell>
              </TableRow>
            ) : (
              data?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="center">{item.username}</TableCell>
                  <TableCell className="center">{item.phone_number}</TableCell>
                  <TableCell className="center">{item.gender}</TableCell>
                  <TableCell className="center">
                    <DeleteIcon
                      className="Delete"
                      onClick={() => handleDelete(item.id)}
                    />
                  </TableCell>
                  <TableCell className="center">
                    <EditIcon
                      className="Edit"
                      onClick={() =>
                        editUser(
                          item.id,
                          item.username,
                          item.phone_number,
                          item.gender
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default Contacts;

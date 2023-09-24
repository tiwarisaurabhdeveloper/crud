import React, { useEffect, useState} from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import {
  Typography,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import axios from "axios";

import { green } from "@mui/material/colors";
const useStyles = makeStyles({
  slc: {
    backgroundColor: green[500],
    color: "white",
  },
  tbc: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
function List() {
  const classes = useStyles();
  const [students, setStudents] = useState([]);
  useEffect(() => {
    async function getAllStudent() {
        try {
          const student = await axios.get("http://localhost:5000/students");
          // console.log(students.data);
          setStudents(student.data);
        //   console.log(student.data.length);
        } catch (error) {
          console.log("spm");
        }
      }
    getAllStudent();
    // console.log(students.length);
  });

  const removeData = async(id)=> {
      await axios.delete(`http://localhost:3333/students/${id}`);
  }
  
  return (
    <>
      <Box textAlign={"center"} p={2} mb={2} className={classes.slc}>
        <Typography variant="h3">Student List</Typography>
      </Box>
      {students.length>=1 && <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "orange" }}>
              <TableCell align="center" className={classes.tbc}></TableCell>
              <TableCell align="center" className={classes.tbc}>
                Name
              </TableCell>
              <TableCell align="center" className={classes.tbc}>
                Email
              </TableCell>
              <TableCell align="center" className={classes.tbc}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, i) => {
              return (
                <TableRow key={i}>
                  <TableCell align="center">{i + 1}</TableCell>
                  <TableCell align="center">{student.stuname}</TableCell>
                  <TableCell align="center">{student.email}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View">
                      <IconButton>
                        <Link to={`/view/${student.id}`}>
                          <VisibilityIcon color="primary" />
                        </Link>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton>
                        <Link to={`/edit/${student.id}`}>
                          <EditIcon color="primary" />
                        </Link>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => {
                        removeData(student.id);
                      }}>
                        <DeleteIcon  color="secondary" />
                         
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>}
    </>
  );
}
export default List;

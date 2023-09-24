import React from "react";
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
    Button,
  } from "@mui/material";
  import { makeStyles } from "@mui/styles";
  import { orange } from "@mui/material/colors";
import { useParams,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
  
  const useStyles = makeStyles({    
    slc: {
      backgroundColor: orange[500],
      color: "white",
    },
    tbc: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    },
  });
function View() {
    const {id}= useParams()
    const classes = useStyles();
    const [student, setStudent] = useState([]);
  useEffect(() => {
    async function getStudent() {
        try {
          const student = await axios.get(`http://localhost:5000/students/${id}`);
        //   console.log(student.data);
          setStudent(student.data);
        } catch (error) {
          console.log("spm");
        }
      }
    getStudent();
  });
  
  const navigate=useNavigate();
  const handlelcick=()=>{
    navigate("/")
  }
    return(
        <>
        <Box textAlign={"center"} p={2} mb={2} className={classes.slc}>
            <Typography variant="h3">Student Deatils</Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "orange" }}>
                  <TableCell align="center" className={classes.tbc}>
                    No
                  </TableCell>
                  <TableCell align="center" className={classes.tbc}>
                    Name
                  </TableCell>
                  <TableCell align="center" className={classes.tbc}>
                    Email
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">{student.id}</TableCell>
                  <TableCell align="center">{student.stuname}</TableCell>
                  <TableCell align="center">{student.email}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box m={3} textAlign={"center"} >
            <Button onClick={handlelcick}  variant="contained" color="primary">
                Back To Home
            </Button>
          </Box>
        </>
    )
}
export default View;
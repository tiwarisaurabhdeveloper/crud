import React from "react";
import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { deepPurple, deepOrange } from "@mui/material/colors";
import { useParams,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
const useStyles = makeStyles({
  hc: {
    backgroundColor: deepPurple[400],
    color: "white",
  },
  addstc: {
    backgroundColor: deepOrange[400],
    color: "white",
  },
});
function Edit() {
    const {id}= useParams()
    const data={stuname:"",email:""}
    const [student, setStudent] = useState(data);
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
  },[id]);
  const changehandle=(e)=>{
    setStudent({...student,[e.target.name]:e.target.value})
    // console.log(inputdata);
  }
  
const handlesubmit=async (e)=>{
  e.preventDefault();
  try {
  await axios.put(`http://localhost:5000/students/${id}`,student);
  navigate("/")
  } catch (error) {
    console.log("spm");
  }
}


  const navigate=useNavigate();
  const handlelcick=()=>{
    navigate("/")
  }
  const classes = useStyles();
  
  return (
    <>
      <Box textAlign={"center"} className={classes.hc} p={2} mb={2}>
        <Typography variant="h3">react crud with api call</Typography>
      </Box>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item md={6} xs={12}>
          <Box textAlign={"center"} p={2} mb={2} className={classes.addstc}>
            <Typography variant="h3">Student List Add Student</Typography>
          </Box>
          <form>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="id"
                  name="id"
                  variant="outlined"
                  required
                  fullWidth
                  value={id}
                  id="id"
                  label="Id"
                  desabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="stuname"
                  name="stuname"
                  variant="outlined"
                  required
                  fullWidth
                  value={student.stuname}
                  id="stuname"
                  onChange={changehandle}
                  label="Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  value={student.email}
                  id="email"
                  onChange={changehandle}
                  label="Email Address"
                />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handlesubmit}
              >
                Update
              </Button>
            </Box>
          </form>
          <Box m={3} textAlign={"center"} >
            <Button variant="contained" onClick={handlelcick} color="primary">
                Back To Home
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
export default Edit;

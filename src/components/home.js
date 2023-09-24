import React,{useState} from "react";
import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";

import {deepPurple, deepOrange } from "@mui/material/colors";

import List from "./List";
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
function Home() {
  const data={stuname:"",email:""}
  // const [listdata, setListdata] = useState([]);
    const [inputdata, setInputdata] = useState(data);
    // const [flag, setFlag] = useState(false);
  const classes = useStyles();

  const changehandle=(e)=>{
    setInputdata({...inputdata,[e.target.name]:e.target.value})
    console.log(inputdata);
  }
  
const handlesubmit=async (e)=>{
  e.preventDefault();
  try {
  await axios.post(`http://localhost:5000/students`,inputdata);
    
  } catch (error) {
    console.log("spm");
  }
}
  return (
    <>
      <Box textAlign={"center"} className={classes.hc} p={2} mb={2}>
        <Typography variant="h3">react crud with api call</Typography>
      </Box>
      <Grid container justify="center" spacing={3}>
        <Grid item md={6} xs={12}>
          <Box textAlign={"center"} p={2} mb={2} className={classes.addstc}>
            <Typography variant="h3">Student List Add Student</Typography>
          </Box>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="stuname"
                  name="stuname"
                  variant="outlined"
                  required
                  fullWidth
                  value={inputdata.stuname}
                  onChange={changehandle}
                  id="stuname"
                  label="Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  value={inputdata.email}
                  onChange={changehandle}
                  id="email"
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
                Add
              </Button>
            </Box>
          </form>
        </Grid>
        <Grid item xs={12} md={6}>
          <List/>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;

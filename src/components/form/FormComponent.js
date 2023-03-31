import React from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  Stack,
  Select,
  Box,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import axios from "axios";

const FormComponent = ({
  info,
  setInfo,
  initialValues,
  update,
  setUpdate,
  mainUrl,
  refresh,
  setRefresh,
}) => {
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleNewContact = async () => {
    try {
      const res = await axios({ method: "post", url: mainUrl, data: info });
      setRefresh(!refresh);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios({
        method: "put",
        url: `${mainUrl}${id}/`,
        data: info,
      });
      setRefresh(!refresh);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (update) {
      handleUpdate(info.id);
      setUpdate(false);
    } else {
      handleNewContact();
    }
    setInfo(initialValues);
  };

  return (
    <div>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        style={{ width: "300" }}
      >
        <p className="contact-header">
          <a
            href="https://clarusway.com/"
            className="design"
            target="_blank"
            rel="noopener noreferrer"
          >
            <code>{"<Clarusway/>"}</code>
          </a>{" "}
          <span className="design header">design</span>
        </p>
        <h2 className="contact-header Add">Add Contact</h2>

        <Box style={{ backgroundColor: "white", padding: "20px" }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3} direction="column">
              <TextField
                variant="outlined"
                name="username"
                placeholder="Name"
                value={info.username}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                name="phone_number"
                placeholder="Phone Number"
                value={info.phone_number}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneEnabledIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel style={{ paddingLeft: "20px" }}>Gender</InputLabel>
                <Select
                  label="Gender"
                  name="gender"
                  variant="outlined"
                  value={info.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="F">Female</MenuItem>
                  <MenuItem value="M">Male</MenuItem>
                  <MenuItem value="O">Other</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" type="submit" value="Submit">
                {update ? "UPDATE" : "ADD"}
              </Button>
            </Stack>
          </form>
        </Box>
      </Grid>
    </div>
  );
};

export default FormComponent;

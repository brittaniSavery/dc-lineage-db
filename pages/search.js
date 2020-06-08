import React from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import {
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  FormControl,
  FormGroup,
  Checkbox,
  FormLabel,
} from "@material-ui/core";
import { SEARCH_LINEAGES, HOLIDAYS, LINEAGE_TYPES } from "../lib/constants";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getMaleBreeds, getFemaleBreeds } from "../lib/breeds";

export default function Search() {
  const router = useRouter();
  const { breed } = router.query;

  const maleBreeds = getMaleBreeds();
  const femaleBreeds = getFemaleBreeds();

  return (
    <Layout title="Search">
      <Typography variant="h2" component="h1">
        {SEARCH_LINEAGES}
      </Typography>
      <Typography variant="h6" component="p">
        Use the form below to search the database for lineages.
      </Typography>
      <form noValidate autoComplete="off">
        <Autocomplete
          id="male-breed"
          options={maleBreeds}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Male Breed" variant="outlined" />
          )}
        />
        <Autocomplete
          id="female-breed"
          options={femaleBreeds}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Female Breed" variant="outlined" />
          )}
        />
        <Autocomplete
          id="type"
          options={LINEAGE_TYPES}
          renderInput={(params) => (
            <TextField {...params} label="Type" variant="outlined" />
          )}
        />
        <TextField
          id="generation"
          label="Generation"
          type="number"
          variant="outlined"
        />
        <FormControlLabel
          control={
            <Switch
              //checked={state.checkedB}
              //onChange={handleChange}
              id="shiny"
              name="shiny"
              color="primary"
            />
          }
          label="Shiny"
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Holiday</FormLabel>
          <FormGroup row>
            {HOLIDAYS.map((holiday) => (
              <FormControlLabel
                key={holiday}
                control={<Checkbox name={holiday.toLowerCase()} />}
                label={holiday}
              />
            ))}
          </FormGroup>
        </FormControl>
      </form>
    </Layout>
  );
}

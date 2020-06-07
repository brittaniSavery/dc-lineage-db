import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { getBreedsByHoliday } from "../lib/breeds";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: 10,
    [theme.breakpoints.only("xs")]: {
      width: "55vw",
    },
    [theme.breakpoints.up("sm")]: {
      width: "65vw",
    },
  },
  cardContent: {
    paddingTop: 5,
  },
}));

export default function SearchCard({ type }) {
  const breeds = getBreedsByHoliday(type);
  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography
          align="center"
          variant="h6"
          color="textSecondary"
          gutterBottom
        >
          {type}
        </Typography>
        <Grid container justify="space-between">
          {breeds.map((breed) => (
            <Grid item key={breed.name} xs={12} sm={6} md={4} lg={3}>
              <Typography align="center">{breed.name}</Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

SearchCard.propTypes = {
  type: PropTypes.string.isRequired,
};

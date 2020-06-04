import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { getBreedsByHoliday } from "../lib/breeds";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  cardPadding: {
    margin: 10,
  },
  cardContentPadding: {
    paddingTop: 5,
  },
});

export default function SearchCard({ type }) {
  const breeds = getBreedsByHoliday(type);
  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.cardPadding}>
      <CardContent className={classes.cardContentPadding}>
        <Typography
          align="center"
          variant="h6"
          color="textSecondary"
          gutterBottom
        >
          {type}
        </Typography>
        <Grid container>
          {breeds.map((breed) => (
            <Grid item key={breed.name} xs={12} sm={4}>
              <Typography>{breed.name}</Typography>
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

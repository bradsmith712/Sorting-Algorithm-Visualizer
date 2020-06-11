import * as React from 'react';
import { useState } from 'react';
import { AppBar, Typography, Button, Slider } from '@material-ui/core';
import { withStyles, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { white } from 'color-name';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
    backgroundColor: 'white'
  },
  slider: {
    width: '100px'
  }
})


function Header() {
  const [value, setValue] = useState(10);

  const classes = useStyles();

  function handleSlider(evt: any) {
    console.log('in handleSlider.. evt = ', evt);
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Slider
          aria-label="Array Size"
          value={value}
          onChange={handleSlider}
          min={4}
          max={100}
        />
      </AppBar>
    </div>
  )
}

export default Header;

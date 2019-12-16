import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


const ArticlesFilter = props => {
  const classes = useStyles();
  
  const handleClick = event => {
    props.handleOrder(event.target.textContent);
  };
    
    return (
        <div className={classes.root}>
        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
          <Button onClick={handleClick}>asc</Button>
          <Button onClick={handleClick}>desc</Button>
        </ButtonGroup>
      </div>
    );
};

export default ArticlesFilter;
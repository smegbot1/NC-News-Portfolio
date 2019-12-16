import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

const ArticlesFilter = props => {
  const classes = useStyles();
  const [sort_by, setSortBy] = React.useState('created_at');
  
  const handleClick = event => {
    props.handleOrder(event.target.textContent);
  };

  const handleChange = event => {
    setSortBy(event.target.value);
    props.handleSortBy(event.target.value);
  };
    
    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel id="sort_by">Sort By</InputLabel>
          <Select
            labelId="sort_by_select"
            id="sort_by_select"
            value={sort_by}
            onChange={handleChange}
          >
            <MenuItem value={'title'}>Title</MenuItem>
            <MenuItem value={'author'}>Author</MenuItem>
            <MenuItem value={'created_at'}>Date Published</MenuItem>
          </Select>
        </FormControl>
        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
          <Button onClick={handleClick}>asc</Button>
          <Button onClick={handleClick}>desc</Button>
        </ButtonGroup>
      </div>
    );
};

export default ArticlesFilter;
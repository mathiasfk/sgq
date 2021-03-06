import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// core components
import styles from "assets/jss/material-dashboard-react/components/customSelectStyle.js";

const useStyles = makeStyles(styles);

export default function CustomSelect(props) {
    const classes = useStyles();
    const {
      formControlProps,
      labelText,
      id,
      labelProps,
      options,
      selectedValue,
      setSelectedValue,
      onChange
    } = props;

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        if(onChange) onChange(event.target.value);
    };
  
    const marginTop = classNames({
      [classes.marginTop]: labelText === undefined
    });
    return (
      <FormControl
        {...formControlProps}
        className={formControlProps.className + " " + classes.formControl}
      >
        {labelText !== undefined ? (
          <InputLabel
            
            htmlFor={id}
            {...labelProps}
          >
            {labelText}
          </InputLabel>
        ) : null}
        <Select
          classes={{
            root: marginTop,
          }}
          value={selectedValue}
          onChange={handleChange}
          id={id}
        >
        {options.map(item => (
        <MenuItem value={item.id}>{item.name}</MenuItem>
        ))}
        </Select>
      </FormControl>
    );
  }
  
  CustomSelect.propTypes = {
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    formControlProps: PropTypes.object,
    options: PropTypes.array,
    setSelectedValue: PropTypes.func,
  };
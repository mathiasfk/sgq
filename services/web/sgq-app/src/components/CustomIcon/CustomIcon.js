import React from "react";
import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

export default function CustomInput(props) {
    const classes = useStyles();

    const { logo, logoText } = props;

    return (
        <div className={classes.logo}>
        <a
            href=""
            className={classNames(classes.logoLink, {
            [classes.logoLinkRTL]: props.rtlActive
            })}
            target="_blank"
        >
            <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img} />
            </div>
            {logoText}
        </a>
        </div>
    );
}
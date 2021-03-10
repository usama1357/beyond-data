import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: "#085FAB",
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(2),
    letterSpacing: "0px",
    fontSize: "12px",
    color: "#6d6d6d",
    opacity: "1",
    paddingBottom: "0px",
    paddingTop: "20px",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#6d6d6d",
      opacity: 1,
    },
    "&$selected": {
      color: "black",
      fontWeight: "700",
      fontFamily: "Lato",
    },
    "&:focus": {
      color: "black",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    height: "60px",
  },
  padding: {
    padding: "5px",
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: "#2e1534",
  },
}));

export default function AutoMLSelectDatasetsTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    switch (newValue) {
      case 0:
        props.setTab("my_projects");
        break;
      case 1:
        props.setTab("downloaded_projects");
        break;
      case 2:
        props.setTab("global_projects");
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs
          value={value}
          onChange={handleChange}
          aria-label="ant example"
          scrollButtons="auto"
          variant="scrollable"
        >
          <AntTab label="Financial Data" />
          <AntTab label="Trading Data" />
          <AntTab label="Economical Data" />
          <AntTab label="Industrial Data" />
          <AntTab label="My Datasets" />
        </AntTabs>
      </div>
      {/* <div className={classes.demo2}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="Workflows" />
          <StyledTab label="Datasets" />
          <StyledTab label="Connections" />
        </StyledTabs>
        <Typography className={classes.padding} />
      </div> */}
    </div>
  );
}

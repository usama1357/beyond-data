import React, { useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useLocation } from "react-router-dom";

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
    marginRight: theme.spacing(4),
    letterSpacing: "0px",
    fontSize: "14px",
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
      color: "grey",
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

export default function CustomTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  let location = useLocation();

  useEffect(() => {
    if (location && location.state) {
      if (location.state.info) {
        if (
          location.state.info.screen === "databuckets" &&
          location.state.info.tab
        ) {
          if (location.state.info.tab === "global") {
            setValue(2);
          }
          if (location.state.info.tab === "downloaded") {
            setValue(1);
          }
        }
      }
    }
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.setTab(props.options[newValue]);
    // switch (newValue) {
    //   case 0:
    //     props.setTab("my_projects");
    //     break;
    //   case 1:
    //     props.setTab("downloaded_projects");
    //     break;
    //   case 2:
    //     props.setTab("global_projects");
    //     break;
    //   default:
    //     break;
    // }
  };

  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs
          value={value}
          onChange={handleChange}
          aria-label="ant example"
          scrollButtons="on"
        >
          {props.options.map((item, index) => (
            <AntTab label={item} key={index} />
          ))}
          {/* <AntTab label="My Projects" />
          <AntTab label="Downloaded Projects" />
          <AntTab label="Global Projects" /> */}
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

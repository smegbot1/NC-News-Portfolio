import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import axios from 'axios';

class NavBar extends Component {
    state = {
        value: 0
        // topics: []
    };

    // componentDidMount() {
    //     this.getTopics();
    // };
    componentDidMount() {
        this.setState({ value: 0, topics: this.props.topics })
    }

    handleChange = (_, value) => {
        this.setState({ value })
    };

    // getTopics = () => {
    //     axios.get('/topics').then(res => {
    //         this.setState({ value: 0, topics: res.data.topics });
    //     });
    // };

    TabPanel = () => {
        const { children, value, index, ...other } = this.props;

        return (
          <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
          >
            {value === index && <Box component='span' m={2}>{children}</Box>}
          </Typography>
        );
    }

    linkTab = (props) => <Tab component="a" onClick={event => event.preventDefault()} {...props} />

    a11yProps = (index) => ({ id: `nav-tab-${index}`, 'aria-controls': `nav-tabpanel-${index}`, })

    render() {
        const { value, topics } = this.state;
        const { a11yProps, TabPanel, linkTab, handleChange } = this;

        TabPanel.propTypes = {
            children: PropTypes.node,
            index: PropTypes.any.isRequired,
            value: PropTypes.any.isRequired,
        };

        return (
            <div>
                <AppBar position="static">
                    <Tabs
                        variant="fullWidth"
                        value={value}
                        onChange={handleChange}
                    >
                        {linkTab({ href:'/', label: 'All Articles', ...a11yProps(0)})}
                        {topics.map(({ slug }, i) => linkTab({ key: i, href: `/articles/${slug}`, label: slug, ...a11yProps(i + 1) }))}
                    </Tabs>
                </AppBar>
                {/* <TabPanel value={value} index={0}>
                    Page One
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Page Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Page Three
                </TabPanel> */}
                {/* {topics.map(({ slug }, i) => <TabPanel key={i} label={slug} {...a11yProps(i + 1)}>{slug}</TabPanel> )} */}
          </div>
        );
    }
};

export default NavBar;
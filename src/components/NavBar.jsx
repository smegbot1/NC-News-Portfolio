import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { fetchTopics } from '../utils/api';

class NavBar extends Component {
    state = {
        value: 0,
        topics: [],
        err: ''
    };

    componentDidMount() {
        this.getTopics();
    };

    getTopics = async () => {
        try {
            const { data: { topics } } = await fetchTopics();
            this.setState({ value: 0, topics });
        } catch (err) {
            this.setState({ err: err.msg });
        };
    };

    handleChange = (_, value) => {
        this.setState({ value })
    };

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
    };

    linkTab = (props) => <Tab
        component="a"
        onClick={event => {
            event.preventDefault();
            navigate(props.href);
        }}
        {...props}
    />

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
                        {linkTab({ href:'/', label: 'All Articles', ...a11yProps(0) })}
                        {topics.map(({ slug }, i) => linkTab({ key: i, href: `/${slug}`, label: slug, ...a11yProps(i + 1) }))}
                    </Tabs>
                </AppBar>
          </div>
        );
    }
};

export default NavBar;
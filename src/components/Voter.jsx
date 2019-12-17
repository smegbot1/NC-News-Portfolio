import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { voteComment } from '../utils/api';
// import ErrDisplayer from './ErrDisplayer';

export default class Voter extends Component {
    state = {
        optimisticVotes: 0
        // err: ''
    };

    handleClick = async ({ currentTarget: { value } }) => {
        this.setState(currentState => ({
            optimisticVotes: currentState.optimisticVotes + +value
        }));

        try {
            voteComment(this.props.type, this.props.id, this.state.optimisticVotes)
        } catch (err) {
            this.setState(currentState => ({
                err: 'Cannot vote at this time. Try again later.',
                optimisticVotes: currentState.optimisticVotes - +value
            }))
        };
    };

    render() {
        const { optimisticVotes } = this.state;

        // if (err) return <ErrDisplayer err={err} />

        return <div>
            <IconButton value={1} onClick={this.handleClick.bind(1)} disabled={optimisticVotes > 0} color="secondary" >
                <ExpandLessIcon />
            </IconButton>
            <h5>{this.props.votes + optimisticVotes}</h5>
            <IconButton value={-1} onClick={this.handleClick.bind(-1)} disabled={optimisticVotes < 0} color="primary" >
                <ExpandMoreIcon name={-1} />
            </IconButton>
        </div>
    };
};
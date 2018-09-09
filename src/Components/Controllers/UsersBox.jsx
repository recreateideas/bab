import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../store/mapToProps/mapToProps_UsersBox';
import { UserContainer } from '../BasicComponents';

class UsersBox extends React.Component {

    constructor(props) {
        super(props);
    }

    userOnClick(e){
        console.log('click');
    }

    renderUser(user,index){
        let rowClass = index === 0 ? 'firstUser' : '';
        rowClass = (index % 2) === 1 ? (rowClass+' oddUser') : (rowClass+' evenUser');
        // rowClass = (index % 2) === 0 ? (rowClass+' evenUser') : '';
        // console.log((index % 2));
        return (
            <li key={index} className={rowClass}>
                <UserContainer
                    containerId={`user_${index}`}
                    addClass=''
                    click={this.userOnClick.bind(this)}
                    nickname={user.nickname}
                    lastActive={``}
                />
            </li>
        )
    }

    render() {
        console.log(this.props.storeAllUsers);
        const users = this.props.storeAllUsers;
        return (
            <div id="usersBox" className="usersBox">
            <ul>
                {users.map(((user,index) => this.renderUser(user,index)))}
            </ul>
            </div>
        )
    }

};

UsersBox.propTypes = {
    storeAllUsers: PropTypes.array,
    storeActiveUsers: PropTypes.array,
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersBox);

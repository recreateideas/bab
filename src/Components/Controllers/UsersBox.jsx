import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../store/mapToProps/mapToProps_UsersBox';
import { UserContainer } from '../BasicComponents';

class UsersBox extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            isUserTo: '',
            customId: '',
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isUserTo){
            this.setState({isUserTo: nextProps.isUserTo});
        }
    }

    userOnClick(e){
        e.stopPropagation();
        const userTo = {
            customId: e.currentTarget.dataset.customid,
            nickname: e.currentTarget.dataset.nickname,
        }
        this.props.setUserToToStore(userTo);
        this.setState({isUserTo: 'selectedUser'});
        // add CSS
    }

    isUserActive(id){
        const activeUsers = this.props.storeActiveUsers;
        let found = null;
        activeUsers.filter(user => user.customId === id).forEach(user => {found = true});
        return found;
    }

    renderUser(user,index){
        let rowClass = index === 0 ? 'firstUser' : '';
        rowClass = (index % 2) === 1 ? (rowClass+' oddUser') : (rowClass+' evenUser');
        const activeUser = this.isUserActive(user.customId) ? 'activeUser' : 'inactiveUser';
        const isSelected = user.customId === this.props.storeUserTo.customId ? 'selectedUser' : '';
        return (
            <li key={index} className={`${rowClass} ${isSelected}`}>
                <UserContainer
                    containerId={`user_${index}`}
                    chatId={this.props.storeChatId}
                    addClass=''
                    click={this.userOnClick.bind(this)}
                    nickname={user.nickname}
                    lastActive={``}
                    activeUser={activeUser}
                    customID={user.customId}
                />
            </li>
        )
    }

    render() {
        // console.log(this.props.storeActiveUsers);
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
    storeUserTo: PropTypes.object,
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersBox);

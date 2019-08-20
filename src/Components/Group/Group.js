import React from 'react'
import { getSelectedGroup } from '../../Redux/groupReducer.js'
import { connect } from 'react-redux';

function Group(props) {
    let { selectedGroup } = props.groups
    console.log('selected group:', selectedGroup);
    if (selectedGroup && selectedGroup[0]) {
        let { group_name, group_picture, description } = selectedGroup[0]
        return (
            <div>
                {group_name}
                <img src={group_picture} alt='Group' />
                {description}
            </div>
        )
    } else return null
}

function mapStateToProps(state) {
    return {
        user: state.user,
        groups: state.groups
    }
}
export default connect(
    mapStateToProps,
    { getSelectedGroup }
)(Group);

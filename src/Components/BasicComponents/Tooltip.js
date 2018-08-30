import React from 'react';
import PropTypes from 'prop-types';

//insert function to display and hide

const Tooltip = props => {
    return (
        <div className={`tooltip ${props.displayTooltip}`}>
        {props.content}
       </div>
    )
}

Tooltip.PropTypes = {
    displayTooltip: PropTypes.string,
    content: PropTypes.string
}

export default Tooltip;

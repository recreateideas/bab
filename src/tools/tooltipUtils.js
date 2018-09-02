

const showTooltip = (id,component) => {
    component.setState({
        [`display_${id}_tooltip`]: 'show'
    })
},

hideTooltip = (id,component) => {
    component.setState({
        [`display_${id}_tooltip`]: 'hidden'
    })
}

export {showTooltip, hideTooltip }

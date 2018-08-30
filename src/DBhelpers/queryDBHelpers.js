
const fetchResults = function(){
    const query = this.props.storeMongoQuery;
    fetch(`/query/${query}`).then(res => res.json()).then(data => console.log(data));
};

const findAllResults = function(){
    fetch(`/mongo`).then(res => res.json()).then(data => console.log(data));
};

export { fetchResults, findAllResults};

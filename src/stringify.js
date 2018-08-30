const stringifyStages = () => {                                         //receives the queryCollectionState
    const object = this.state.queryCollectionState;
    let count1 = 0, string = '', subString='';
    let query = this.state.query;
    console.log(this.state.query);
    for (let stageIter in object) {   
      if (this.state.query.stages.hasOwnProperty(stageIter)){
        console.log(stageIter);                              //iterates the stages in queryCollectionState
        let objectName = object[stageIter];
        let count2 = 0;
        if (objectName.actives && objectName!=='preStage') {                           //'selects' the active lines in the stage belonging to queryCollectionState
          const queryName = query.stages[stageIter];
          subString = this.handlePreParamsType(stageIter,queryName)+'{';
          for (const [index,value] of objectName.actives.entries()){  //for each line in qCS ..
            if (value === true) {                                     //if it's active it  builds a string
              const key = objectName.keys[index];
              const op = objectName.operators[index];   
              const opSyn = this.getOperatorParamsFromConfig(op);
              const valueType = this.getValueTypesFromConfig(objectName.types[index]);
              const val = objectName.values[index];
              subString += (count2 > 0 ? ', ' : '');                   //separates the key value pairs
              subString += this.quotify(key) + opSyn.pre + op + opSyn.left + valueType.left + val + valueType.right + opSyn.right;
              count2++;
            }
          }
          subString += this.handlePostParamsType(stageIter, queryName)+'}';
          let stageVar = query.stages[stageIter];
          stageVar.params = subString
          query.stages[stageIter] = stageVar;
          this.setState({
              query : query 
          });
          string += (count1 > 0  ? ', ' : '');                         //separates the stages
          string += subString;
        }
        count1++;
      }
   }
    string = this.sanitizeQueryString(string);
    this.setState({
      mongo_query: this.dbAndCollection() + query.openQuery + string + query.closeQuery
    });
  }

import React, { Component } from "react";

class Like extends Component {
  state = {
    like: false
  };
  handleLike = () => {
    if (this.state.like === false) {
      const like = true;
      this.setState({ like });
    } else{
        const like = false;
        this.setState({ like });
    }
  };
  getShape(){
    let classes = "fa fa-heart";
    const {like}=this.state;
    return like ? classes : classes+'-o';

  }
  render() {
    return (
      <React.Fragment>
          <i onClick={() => this.handleLike()} style={{cursor:'pointer'}} className={this.getShape()} />
      </React.Fragment>
    );
  }
}

export default Like;

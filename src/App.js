import React, { Component } from 'react';
import './style2.css';
import { CSSTransition,TransitionGroup } from 'react-transition-group';
class App extends Component{
  constructor(props){
    super(props);
    this.state={
      list:[]
    }
    this.handleAddItem=this.handleAddItem.bind(this)
  }
  render(){
    return(
      <div>
      <TransitionGroup>
      {
        this.state.list.map((item,index)=>{
        return(
          <CSSTransition
          timeout={1000}
          classNames='fade'
          unmountOnExit
          onEntered={(el)=>{el.style.color='blue'}}
          appear={true}
          key={index}
          >
            <div>{item}</div>
          </CSSTransition>

        )  
        })
      }
      </TransitionGroup>
      
      <button onClick={this.handleAddItem}>隐藏</button>

      </div>
    )
  }
  handleToggole(){
    this.setState(
      {
        show:this.state.show ? false : true
      }
    )
  }
  handleAddItem(){
    this.setState((prevState)=>{
      return{
        list:[...prevState.list,'item']
      }
    })
  }
}
export default App;
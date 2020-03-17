import React from 'react';
import PropTypes from "prop-types";
class TodoItem extends React.Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
        {
            //也可以直接在construcor构造函数中直接对this进行绑定
            //该方法可以节约性能
        }

    }
    render(){
        //这里变量一定要使用从父组件传过来的变量，好坑....
        const {item_pass}=this.props;
        return (
        <div onClick={this.handleClick}>
                {item_pass}
        </div>)
    }
    handleClick(){
        this.props.delete_Item_pass(this.props.index_pass);
    }
    //原本我们得父组件render函数刷新后，就会连带着子组件得一起刷新
    //通过这个生命周期函数，就可以防止这种刷新，起到节约性能得目的
    shouldComponentUpdate(nextProps,nextState){
        //这里得nextProps是指更新得Props，所以应该拿更新得内容和原来得内容做对比决定是否should更新
        if (nextProps.item_pass!==this.props.item_pass){
            return true;
        }
        else{
            return false;
        }

    }
}
//对父组件传来的变量进行一个规定，规定传过来的变量类型；
//期望传递来的值
TodoItem.propTypes={
 
    item_pass:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    delete_Item_pass:PropTypes.func,
    index_pass:PropTypes.number

}
//在没有值传递过来的情况下设置默认变量参数
TodoItem.defaultProps={
    test:"hello sb",

}

export default TodoItem;
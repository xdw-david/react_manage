import React, { Component } from 'react';
import TodoItem from './TodoItem';
import './style.css';
import axios from "axios";
class TodoList extends Component {
	  constructor(props){
			super(props);
			this.state={
				inputValue:'hello',
				list:[]
			}
			this.handleInputChange=this.handleInputChange.bind(this);
			this.handlemybtn=this.handlemybtn.bind(this);
			this.delete_Item=this.delete_Item.bind(this);
		}

    render(){
		console.log("render")
        return(
						<div>
							<label htmlFor="metoo">也可以点我！</label>
							<input id="metoo" 
							className="input" 
							value={this.state.inputValue} 
							onChange={this.handleInputChange}
							//构建一个ref引用，this.input指向的是<input>DOM节点，所以我在这里赋值的input就代表了input标签DOM
							 />
						<button onClick={this.handlemybtn}>戳我快！</button>
						<ul> 
              				{
								//通过map函数来遍历数组list
								this.state.list.map((item,index)=>{
                  return(
										<div key={index}>
											{
												//此处delete_Item_pass={this.delete_Item.bind(this)}需要提前把这个函数的this绑定在父组件上
												//这样传递给子组件，子组件才能使用它的this调用父组件的函数，否则会让子组件认为是在调用自己的this.
											}
										<TodoItem 
										
										item_pass={item} 
										index_pass={index} 
										delete_Item_pass={this.delete_Item}
										/>
						
								</div>
									)
								})
							}
						</ul>

						</div>
        )
		}
		//所输入的即input框显示的
		handleInputChange(e){
			
			//e代表的是事件，target是我们从console控制台中发现的属性，指的是我点击事件发生的DOM节点
			//于是我们发现可以使用这个节点的value值来获取内容
				console.log(this);
				// this.state.inputValue=e.target.value;
				//发现不能通过直接赋值来覆盖，需要调用setState()函数
					// this.setState({
				// 	inputValue:e.target.value
				// })
				//使用下面的标准写法
			const value =e.target.value;
			this.setState(()=>({
					inputValue:value
			}))
		}
		//
		handlemybtn(){
    //  this.setState(
		// 	 {
		// 		 //这里...this.state.list 是将该数组里所有元素都展开拆分成一个个元素
		// 		 list:[...this.state.list,this.state.inputValue],
		// 		 inputValue:''
		// 	 }
		//  )
		//更靠谱的写法，prevState:保存之前一次的state状态,相当于this.state
		this.setState((prevState)=>({
			list:[...prevState.list,prevState.inputValue],
			inputValue:''
		}))
		
		}
		delete_Item(index){
			const list_copy=[...this.state.list];
			list_copy.splice(index,1);
			this.setState({
				//不在这里直接套变量是因为react规定不要在state中直接修改数据
				list:list_copy
			})
			console.log(index);
		}
		componentDidMount(index){
			//通过axios获取url的内容.then就是如果成功怎么样.catch就是如果失败怎么样
			axios.get('/api/todolist')
			.then((res)=>{
				console.log(res.data);
				this.setState(()=>{
					return {
						list:res.data
					}
				})
			})
			.catch(()=>{alert("error")})
		}
	}
export default TodoList;
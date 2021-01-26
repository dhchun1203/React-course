import { Component } from "react";

class TOC extends Component {
	shouldComponentUpdate(newProps, newState) {
		console.log(
			"TOC render shouldComponentUpdate",
			newProps.data,
			this.props.data
		);
		if (this.props.data === newProps.data) {
			return false;
		}
		return true;
	}
	render() {
		console.log("===>TOC render");
		let list = [];
		let data = this.props.data;
		let i = 0;
		while (i < data.length) {
			list.push(
				<li key={data[i].id}>
					{/* 
					이렇게 반복적으로 생성되는 컴포넌트에는 리액트가 
					이해할 수 있게 고유한 key값을 넣어주는 것을 권장한다. 
					*/}
					<a
						href={"/content/" + data[i].id}
						data-id={data[i].id}
						onClick={(e) => {
							e.preventDefault();
							this.props.onChangePage(e.target.dataset.id);
						}}
					>
						{data[i].title}
					</a>
				</li>
			);
			i += 1;
		}
		return (
			<nav>
				<ul>{list}</ul>
			</nav>
		);
	}
}

export default TOC;

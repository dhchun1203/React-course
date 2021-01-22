import { React, Component } from "react";
import Subject from "./components/Subject";
import TOC from "./components/TOC";
import Content from "./components/Content";
import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: "read",
			selected_content_id: 2,
			subject: { title: "WEB", sub: "World Wide Web!" },
			welcome: { title: "Welcome", desc: "Hello, React!!" },
			contents: [
				{ id: 1, title: "HTML", desc: "HTML is for information" },
				{ id: 2, title: "CSS", desc: "CSS is for design" },
				{ id: 3, title: "JavaScript", desc: "JavaScript is for interactive" },
			],
		};
	}
	render() {
		console.log("App render");
		let _title,
			_desc = null;
		if (this.state.mode === "welcome") {
			_title = this.state.welcome.title;
			_desc = this.state.welcome.desc;
		} else if (this.state.mode === "read") {
			this.state.contents.forEach((content) => {
				if (content.id === this.state.selected_content_id) {
					_title = content.title;
					_desc = content.desc;
				}
			});
		}
		return (
			<div className="App">
				<Subject
					title={this.state.subject.title}
					sub={this.state.subject.sub}
					onChangePage={() => {
						this.setState({ mode: "welcome" });
					}}
				/>
				<TOC
					onChangePage={(id) => {
						this.setState({
							mode: "read",
							selected_content_id: id * 1,
						});
					}}
					data={this.state.contents}
				/>
				<Content title={_title} desc={_desc} />
			</div>
		);
	}
}

export default App;

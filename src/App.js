import { React, Component } from "react";
import Subject from "./components/Subject";
import TOC from "./components/TOC";
import Control from "./components/Control";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.max_content_id = 3;
		this.state = {
			mode: "create",
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
			_desc,
			_article = null;
		if (this.state.mode === "welcome") {
			_title = this.state.welcome.title;
			_desc = this.state.welcome.desc;
			_article = <ReadContent title={_title} desc={_desc} />;
		} else if (this.state.mode === "read") {
			this.state.contents.forEach((content) => {
				if (content.id === this.state.selected_content_id) {
					_title = content.title;
					_desc = content.desc;
				}
			});
			_article = <ReadContent title={_title} desc={_desc} />;
		} else if (this.state.mode === "create") {
			_article = (
				<CreateContent
					onSubmit={(_title, _desc) => {
						// add content to this.state.contents
						this.max_content_id += 1;
						let _contents = this.state.contents.concat({
							id: this.max_content_id,
							title: _title,
							desc: _desc,
						});
						this.setState({
							contents: _contents,
						});
						console.log(_title, _desc);
					}}
				/>
			);
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
				<Control
					onChangeMode={(_mode) => {
						this.setState({
							mode: _mode,
						});
					}}
				/>
				{_article}
			</div>
		);
	}
}

export default App;

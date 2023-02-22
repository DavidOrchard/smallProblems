import React from "react";
import * as ReactDOM from 'react-dom';

// React is loaded and is available as React and ReactDOM
// imports should NOT be used

type TooltipProps = {
  text: string;
};
class Tooltip extends React.Component<TooltipProps> {
  text = "";
  id = "";

  constructor(props) {
    super(props);
    this.text = props.text;
  }

  render() {
    var el = document.getElementById('tooltip');

    debugger;
    // React does *not* create a new div. It renders the children into `domNode`.
    // `domNode` is any valid DOM node, regardless of its location in the DOM.
    return ReactDOM.createPortal(
      <div>{this.props.text}</div>,
      el
    );
  }
}

class App extends React.Component {
  state = {
    text: ''
  }

  onDocumentClick = (event) => {
    if (event.target.tagName === 'BUTTON') {
      this.setState({ text: event.target.textContent })
    }
  }
  
  componentDidMount() {
    document.addEventListener('click', this.onDocumentClick)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick)
  }

  render() {
    return <div>
      {this.props.children}
      <Tooltip text={this.state.text}/>
    </div>
  }
}

document.body.innerHTML = "<div id='root'></div><div id='tooltip'></div>";
const rootElement = document.getElementById("root");
ReactDOM.render(<App>
  <button id="button1">First button</button>
  <button id="button2">Second button</button>
</App>, rootElement);
console.log("rendered app");
document.getElementById("button2").click();
setTimeout(() => console.log(document.body.innerHTML));
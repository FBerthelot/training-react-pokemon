import { Component } from "react";

export class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo)
    }

    render() {
      if (this.state.hasError) {
        return <h1>Merci de rafarichir la page.</h1>;
      }
  
      return this.props.children;
    }
  }
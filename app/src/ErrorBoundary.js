import React from 'react';


function logErrorToMyService(error, errorInfo) {
    // Send the error and errorInfo to a logging service
    // Example: MyLoggingService.log(error, errorInfo);
    console.error(error, errorInfo);
  }

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      logErrorToMyService(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        alert("Something went wrong. Please try again later.");
        return null;
      }
  
      return this.props.children;
    }
  }


export default ErrorBoundary;
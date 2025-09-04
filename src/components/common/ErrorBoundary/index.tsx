import { Component, type ErrorInfo, type PropsWithChildren } from "react";

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
    public state: ErrorBoundaryState = {
        hasError: false
    };
  
    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
      return { hasError: true };
    }
  
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      console.error(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-primary">
                <div className="text-center">
                    <p className="text-text-secondary text-2xl">Something went wrong ^(</p>
                </div>
            </div> 
        );
      }
  
      return this.props.children; 
    }
}

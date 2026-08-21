import { Component } from 'react'
import { Button, Result } from 'antd'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    }
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="Something went wrong"
          subTitle="An unexpected error occurred while displaying the application."
          extra={
            <Button
              type="primary"
              onClick={this.handleReload}
            >
              Reload
            </Button>
          }
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
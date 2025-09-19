import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-[60vh] flex items-center justify-center'>
          <p>Đã xảy ra lỗi khi tải trang. Vui lòng thử lại.</p>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary



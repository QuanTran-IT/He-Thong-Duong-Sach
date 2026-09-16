import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', fontFamily: 'Manrope, sans-serif', color: '#173f52', background: '#f7f4ee', minHeight: '100vh' }}>
          <h2>Đã xảy ra lỗi khi hiển thị trang (White Screen Error)</h2>
          <p>Dưới đây là thông tin lỗi chi tiết giúp bạn sửa lỗi:</p>
          <pre style={{ background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #dce5df', overflowX: 'auto', fontSize: '13px', color: '#d74345' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
          <button 
            style={{ padding: '10px 15px', background: '#d74345', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
            onClick={() => window.location.reload()}
          >
            Tải lại trang
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'Manrope, sans-serif', color: '#173f52', background: '#f7f4ee', minHeight: '100vh', boxSizing: 'border-box' }}>
          <div style={{ maxWidth: '500px', width: '100%', background: '#fff', padding: '30px 20px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(29, 65, 84, 0.08)', boxSizing: 'border-box' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ width: '48px', height: '48px', background: '#fdeded', color: '#d74345', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '24px', fontWeight: 'bold' }}>!</div>
              <h2 style={{ marginTop: 0, color: '#173f52', fontSize: '18px', lineHeight: '1.4' }}>Đã xảy ra sự cố hiển thị</h2>
              <p style={{ fontSize: '13px', color: '#687b85', margin: '8px 0 0', lineHeight: '1.5' }}>Giao diện trang quản lý hiện không thể tải được. Vui lòng tải lại trang hoặc quay về Cổng bạn đọc.</p>
            </div>
            
            <details style={{ background: '#fdf8f8', padding: '12px', borderRadius: '8px', border: '1px solid #fad4d4', marginBottom: '24px' }}>
              <summary style={{ cursor: 'pointer', fontSize: '12px', fontWeight: '700', color: '#d74345', outline: 'none' }}>Chi tiết lỗi (Dành cho kỹ thuật)</summary>
              <pre style={{ marginTop: '12px', marginBottom: 0, overflowX: 'auto', fontSize: '11px', color: '#b22222', whiteSpace: 'pre-wrap', wordWrap: 'break-word', fontFamily: 'monospace' }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
            
            <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
              <button 
                style={{ width: '100%', padding: '12px', background: '#d74345', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '13px', transition: '0.2s' }}
                onClick={() => window.location.reload()}
              >
                Tải lại trang
              </button>
              <button 
                style={{ width: '100%', padding: '12px', background: '#edf4f6', color: '#173f52', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '13px', transition: '0.2s' }}
                onClick={() => window.location.href = '/'}
              >
                Về Cổng bạn đọc
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

import React from 'react';

type Props = {
  children?: React.ReactChild;
  fallback?: React.ReactNode;
};

class ErrorBoundary extends React.Component<Props, { hasError: boolean }> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps: Partial<Props> = {
    fallback: (
      <h4>
        Something went wrong. We don&apos;t know what, but we&apos;re working
        hard to fix it.
      </h4>
    ),
    children: <></>,
  };

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    // eslint-disable-next-line no-console
    console.warn(error, errorInfo);
    this.setState({
      hasError: true,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    const { fallback, children } = this.props;
    const { hasError } = this.state;
    return hasError ? fallback : children;
  }
}

export default ErrorBoundary;

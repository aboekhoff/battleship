import React from 'react'

export class Screen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        mounted: true
      })
    }, 0)
  }

  render() {
    const { children } = this.props
    const { mounted } = this.state

    const className = mounted ? 'fade in' : 'fade out'

    return (
      <div className={`screen-container ${className}`}>
        {children}
      </div>
    )
  }
}
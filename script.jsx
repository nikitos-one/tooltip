class Tooltip extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this)
        this.state = {
            opacity: false,
            top: 0,
            left: 0
        }
    }

    toggle() {
        const tooltipNode = ReactDOM.findDOMNode(this)
        const tooltipInner = tooltipNode.getElementsByClassName('tooltip-inner')[0]

        this.setState({
            opacity: !this.state.opacity,
        })

        switch (this.props.placement) {
            case 'top':
                this.setState({
                    top: tooltipNode.offsetTop - tooltipNode.offsetHeight,
                    left: tooltipNode.offsetLeft - (tooltipNode.offsetWidth / 2)
                })
                break
            case 'bottom':
                this.setState({
                    top: tooltipNode.offsetTop + tooltipNode.offsetHeight,
                    left: tooltipNode.offsetLeft - (tooltipNode.offsetWidth / 2)
                })
                break
            case 'right':
                this.setState({
                    top: tooltipNode.offsetTop - 3,
                    left: tooltipNode.offsetLeft + tooltipNode.offsetWidth - 5
                })
                break
            case 'left':
                this.setState({
                    top: tooltipNode.offsetTop - 3,
                    left: tooltipNode.offsetLeft - tooltipInner.offsetWidth - 5
                })
                break
        }
    }

    render() {
        let position = {
            top: 0,
            left: 0
        }

        const style = {
            zIndex: (this.state.opacity) ? 1000 : -1000,
            opacity: +this.state.opacity,
            top: (this.state.top || 0),
            left: (this.state.left || 0)
        }

        return (
            <div style={{display: 'inline'}}>
                <span style={{color: 'blue'}}
                      onMouseEnter={this.toggle}
                      onMouseOut={this.toggle}
                >
                    {this.props.children}
                </span>
                <div className={`tooltip bs-tooltip-${this.props.placement}`} style={style} role="tooltip">
                    <div className="tooltip-arrow"></div>
                    <div className="tooltip-inner">
                        {this.props.text}
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        <Tooltip text="The book you're reading now" placement="bottom"> React Quickly </Tooltip>
        Blanditiis dignissimos excepturi facilis hic necessitatibus provident quibusdam quod repellat tenetur totam.
        Aliquid dignissimos doloribus eos facere maxime molestiae quae sit voluptates! A adipisci at consequatur corporis
        cum cupiditate dolores est magnam minima modi molestiae molestias neque omnis possimus quam, sit, voluptatum.

    </div>,
    document.getElementById('tooltip')
)
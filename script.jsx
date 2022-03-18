class Tooltip extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this)

        let action = {};
        if (props.action == 'click') {
            action = {
                'onClick': this.toggle
            }
        }
        else if (props.action == 'hover') {
            action = {
                'onMouseEnter': this.toggle,
                'onMouseOut': this.toggle,
            }
        }

        this.state = {
            opacity: false,
            top: 0,
            left: 0,
            action: action
        }
    }

    async toggle() {
        const tooltipNode = ReactDOM.findDOMNode(this)
        const tooltipInner = tooltipNode.querySelector('.tooltip-inner')

        await this.setState({
            opacity: !this.state.opacity,
        })

        // Сlick actions for tooltip
        if(this.props.action == 'click') {
            const handleEvent = (e)=> {
                if (this.state.opacity) {
                    if(e.target != tooltipNode.firstChild) {
                        this.setState({
                            opacity: !this.state.opacity
                        })
                        // Destroy listener
                        window.removeEventListener('click', handleEvent, false)
                    }
                }
                else {
                    // Destroy listener
                    window.removeEventListener('click', handleEvent, false)
                }
            }

            // Listen for a click outside the element tooltip
            if (this.state.opacity) {
                window.addEventListener('click', handleEvent, false)
            }
        }

        // Сalculate tooltip placement
        switch (this.props.placement) {
            case 'top':
                this.setState({
                    top: tooltipNode.offsetTop - tooltipNode.offsetHeight - 15,
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
                    left: tooltipNode.offsetLeft - tooltipInner.offsetWidth  - 5
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
                <span style={{color: 'blue', whiteSpace: 'nowrap'}}
                      {...this.state.action}
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
        <Tooltip text="The book you're reading now" placement="top" action="click"> Top (Click) </Tooltip>
        Blanditiis dignissimos excepturi facilis hic necessitatibus provident quibusdam quod repellat tenetur totam.
        <Tooltip text="The book you're reading now" placement="bottom" action="hover"> Bottom (Hover) </Tooltip>
        Aliquid dignissimos doloribus eos facere maxime molestiae quae sit voluptates! A adipisci at consequatur corporis
        <Tooltip text="The book you're reading now" placement="right" action="hover"> Right (Hover) </Tooltip>
        cum cupiditate dolores est magnam minima modi molestiae molestias neque omnis possimus quam, sit, voluptatum.
        <Tooltip text="The book you're reading now" placement="left" action="click"> Left (Click) </Tooltip>
    </div>,
    document.getElementById('tooltip')
)
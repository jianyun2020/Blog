import React from "react"
import { Link } from "gatsby"

import './index.scss'



class Head extends React.Component {
  constructor(props) {
    super(props)
    this.menuState = 0;
  }

  changeStateHandler = (state) => {
    this.menuState = state
  }

  render() {

    return (
    <div className="wrapper-head">
      <h2 className="item-title">{this.props.title}</h2>
      <nav className="list-item" >
        <Link onClick={() => this.changeStateHandler(0)} className={['item-link', this.menuState === 0 ? 'active' : ''].join(' ')} to="/"><span className={['item-icon', this.menuState === 0 ? 'active' : ''].join(' ')}></span>首页</Link>
        <Link onClick={() => this.changeStateHandler(1)} className={['item-link', this.menuState === 1 ? 'active' : ''].join(' ')} to="/archive"> <span className={['item-icon', this.menuState === 1 ? 'active' : ''].join(' ')}> </span>归档</Link>
        <Link onClick={() => this.changeStateHandler(2)} className={['item-link', this.menuState === 2 ? 'active' : ''].join(' ')} to="/about"> <span className={['item-icon', this.menuState === 2 ? 'active' : ''].join(' ')}> </span>关于我</Link>
      </nav>
    </div>
    )
  }
}

export default Head
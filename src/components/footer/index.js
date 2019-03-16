import * as React from 'react'
import Link from '../link'
import './styles.css'
import icon from '../../static/icon.png'

const Footer = () => {
  return (
    <footer className="footer">
      <Link
        href="/"
        children={<img className="img-fluid nav-icon" alt="" src={icon} />}
      />
    </footer>
  )
}

export default Footer

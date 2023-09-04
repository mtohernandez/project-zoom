import { grid } from './Grid.module.css'
import { PropTypes } from 'prop-types'

const Grid = ({children}) => {
  return (
    <div className={grid}>
      {children}
    </div>
  )
}

export default Grid

Grid.propTypes = {
  children: PropTypes.node
}


import {Link} from 'react-router-dom'
import './index.css'

const CourseCard = props => {
  const {course} = props
  const {id, logoUrl, name} = course
  return (
    <li className="list-item">
      <Link to={`/courses/${id}`}>
        <img src={logoUrl} alt={name} className="logo-image" />
      </Link>
      <p className="course-name">{name}</p>
    </li>
  )
}
export default CourseCard

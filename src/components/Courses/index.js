import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'
import CourseCard from '../CourseCard'
import Header from '../Header'

const apiConstants = {
  initial: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
}

class Courses extends Component {
  state = {apiStatus: apiConstants.initial, coursesData: []}

  componentDidMount() {
    this.getCourses()
  }

  onClickRetry = () => {
    this.getCourses()
  }

  getCourses = async () => {
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const formattedData = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))

      this.setState({
        coursesData: formattedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
    console.log(data)
  }

  renderCoursesListView = () => {
    const {coursesData} = this.state
    return (
      <>
        <h1 className="main-heading">Courses</h1>
        <ul className="list-container">
          {coursesData.map(eachCourse => (
            <CourseCard course={eachCourse} key={eachCourse.id} />
          ))}
        </ul>
      </>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="Three Dots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-view-button"
        onClick={this.onClickRetry()}
      >
        Retry
      </button>
    </div>
  )

  renderCoursesList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.renderCoursesListView()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="main-container">{this.renderCoursesList()}</div>
      </>
    )
  }
}
export default Courses

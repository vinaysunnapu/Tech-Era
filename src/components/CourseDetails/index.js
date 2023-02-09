import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'

const apiCourseConstants = {
  initial: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
}

class CourseDetails extends Component {
  state = {apiCourseStatus: apiCourseConstants.initial, courseDetails: {}}

  componentDidMount() {
    this.getCourseDetails()
  }

  onClickRetry = () => {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiCourseStatus: apiCourseConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        description: data.course_details.description,
        id: data.course_details.id,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
      }

      this.setState({
        courseDetails: updatedData,
        apiCourseStatus: apiCourseConstants.success,
      })
    } else {
      this.setState({apiCourseStatus: apiCourseConstants.initial})
    }
    console.log(data)
  }

  renderCourseDetailsView = () => {
    const {courseDetails} = this.state
    const {description, name, imageUrl} = courseDetails
    return (
      <div className="course-container">
        <img src={imageUrl} alt={name} className="course-image" />
        <div className="course-name-container">
          <h1 className="course-image-heading">{name}</h1>
          <p className="course-description">{description}</p>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry()}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="Three Dots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderCourseDetails = () => {
    const {apiCourseStatus} = this.state
    switch (apiCourseStatus) {
      case apiCourseConstants.success:
        return this.renderCourseDetailsView()
      case apiCourseConstants.failure:
        return this.renderFailureView()
      case apiCourseConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="course-bg-container">{this.renderCourseDetails()}</div>
      </>
    )
  }
}
export default CourseDetails

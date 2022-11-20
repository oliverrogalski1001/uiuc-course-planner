import AddCourse from "./AddCourse.jsx"
import Course from "./Course"

const Semester = ({ number, semesterCourses, setCoursePlan, handleDelete, setURL, urlConvert }) => {
	const totalCreditHours = semesterCourses.reduce((acc, course) => acc + course.creditHours, 0)
	return (
		<div className="flex flex-col items-center m-4">
			<h1 className="text-xl pb-4">Semester: {number}</h1>
			<AddCourse setCoursePlan={setCoursePlan} semesterIndex={number} setURL={setURL} urlConvert={urlConvert} />
			<h1 className="text-xl py-4">Credit Hours: {totalCreditHours}</h1>
			<div className="border-0 border-white w-52">
				<div>
					{semesterCourses.map((semesterCourse) => (
						<Course key={semesterCourse.id} course={semesterCourse} deleteCourse={handleDelete} />
					))}
				</div>
			</div>
		</div>
	)
}

export default Semester

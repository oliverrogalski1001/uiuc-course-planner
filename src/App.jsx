import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import Semester from "./components/Semester"

function App() {
	const semesters = Array.from({ length: 8 }, (v, i) => i + 1)

	const [coursePlan, setCoursePlan] = useState([])
	const [test, setTest] = useSearchParams({ data: coursePlan })

	const handleDelete = (courseRemove) => {
		setCoursePlan(coursePlan.filter((course) => course.id !== courseRemove.id))
	}

	return (
		<div className="flex flex-col p-6">
			<h1 className="text-center text-4xl text-bold">UIUC 4 Year Planner</h1>
			<div className="flex flex-row justify-start overflow-auto p-6">
				{semesters.map((semester, index) => (
					<Semester
						key={index + 1}
						number={semester}
						semesterCourses={coursePlan.filter((course) => course.semester === semester)}
						setCoursePlan={setCoursePlan}
						handleDelete={handleDelete}
					/>
				))}
			</div>
		</div>
	)
}

export default App

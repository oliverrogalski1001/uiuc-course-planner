import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import Semester from "./components/Semester"
import ShareButton from "./components/ShareButton.jsx"

function App() {
	const semesters = Array.from({ length: 8 }, (v, i) => i + 1)

	const initialCoursePlan = [
		{
			id: 1,
			name: "STAT 107",
			title: "Data Science Discovery",
			semester: 1,
			creditHours: 4,
			explorerURL: "https://courses.illinois.edu/schedule/2023/spring/STAT/107"
		}
	]

	const [url, setURL] = useSearchParams({ data: JSON.stringify(initialCoursePlan) })
	const [coursePlan, setCoursePlan] = useState(JSON.parse(url.get("data")))

	const handleDelete = (courseRemove) => {
		const newPlan = coursePlan.filter((course) => course.id !== courseRemove.id)
		setCoursePlan(newPlan)
		setURL({ data: JSON.stringify(newPlan) })
	}

	return (
		<div className="flex flex-col p-6">
			<div className="flex flex-col items-center">
				<h1 className="text-center text-4xl text-bold">UIUC 4 Year Planner</h1>
				<ShareButton />
			</div>
			<div className="flex flex-row justify-start overflow-auto p-6">
				{semesters.map((semester, index) => (
					<Semester
						key={index + 1}
						number={semester}
						semesterCourses={coursePlan.filter((course) => course.semester === semester)}
						setCoursePlan={setCoursePlan}
						handleDelete={handleDelete}
						setURL={setURL}
					/>
				))}
			</div>
		</div>
	)
}

export default App

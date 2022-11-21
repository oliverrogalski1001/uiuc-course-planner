import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import totalClasses from "./spring2023.json"
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
		},
		{
			id: 2,
			name: "STAT 400",
			title: "Statistics and Probability",
			semester: 2,
			creditHours: 4,
			explorerURL: "https://courses.illinois.edu/schedule/2023/spring/STAT/400"
		}
	]

	const urlConvert = (state) => {
		let newObj = {
			id: [],
			name: [],
			semester: []
		}
		state.forEach((course) => {
			newObj.id.push(course.id)
			newObj.name.push(course.name)
			newObj.semester.push(course.semester)
		})
		return newObj
	}

	const urlDecode = (url) => {
		let obj = JSON.parse(url)
		let newState = []
		for (let i = 0; i < obj.id.length; i++) {
			const nameSplit = obj.name[i].split(" ")
			const courseObject = totalClasses[nameSplit[0]].filter((course) => course.number === nameSplit[1])[0]
			newState.push({
				id: obj.id[i],
				name: obj.name[i],
				title: courseObject.title,
				semester: obj.semester[i],
				creditHours: parseInt(courseObject.hours.charAt(0)),
				explorerURL: courseObject.explorerURL
			})
		}
		return newState
	}

	const [url, setURL] = useSearchParams({
		data: JSON.stringify(urlConvert(initialCoursePlan))
	})
	const [coursePlan, setCoursePlan] = useState(urlDecode(url.get("data")))

	const handleDelete = (courseRemove) => {
		const newPlan = coursePlan.filter((course) => course.id !== courseRemove.id)
		setCoursePlan(newPlan)
		setURL({ data: JSON.stringify(urlConvert(newPlan)) })
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
						urlConvert={urlConvert}
						coursePlan={coursePlan}
					/>
				))}
			</div>
		</div>
	)
}

export default App

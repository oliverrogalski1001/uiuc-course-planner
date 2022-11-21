import { useState } from "react"
import totalClasses from "../spring2023.json"
import SelectSubject from "./SelectSubject.jsx"
import SelectNumber from "./SelectNumber.jsx"

const AddCourse = ({ setCoursePlan, semesterIndex, setURL, urlConvert, coursePlan }) => {
	const [subject, setSubject] = useState("STAT")
	const [number, setNumber] = useState("---")

	const handleAddCourse = () => {
		if (
			number === "---" ||
			coursePlan.filter((course) => {
				const courseNameSplit = course.name.split(" ")
				return courseNameSplit[0] === subject && courseNameSplit[1] === number
			}).length !== 0
		) {
			// TODO
			return false
		}
		const courseObject = totalClasses[subject].filter((course) => course.number === number)[0]
		const creditHours = parseInt(courseObject.hours.charAt(0))
		setCoursePlan((prevCourses) => {
			const newCourse = [
				...prevCourses,
				{
					id: Math.max(prevCourses.map((course) => course.id)) + 1,
					name: subject + " " + number,
					title: courseObject.title,
					semester: semesterIndex,
					creditHours: creditHours,
					explorerURL: courseObject.explorerURL
				}
			]
			setURL({ data: JSON.stringify(urlConvert(newCourse)) })
			return newCourse
		})
	}

	return (
		<div>
			<label htmlFor={`add-class-${semesterIndex}`} className="btn">
				Add Class
			</label>
			<input type="checkbox" id={`add-class-${semesterIndex}`} className="modal-toggle" />
			<div className="modal">
				<div className="modal-box overflow-visible">
					<div className="flex flex-row justify-around">
						<SelectSubject subject={subject} setSubject={setSubject} setNumber={setNumber} />
						<SelectNumber subject={subject} number={number} setNumber={setNumber} />
					</div>
					<div className="modal-action">
						<label htmlFor={`add-class-${semesterIndex}`} className="btn btn-warning">
							Cancel
						</label>
						<label
							htmlFor={`add-class-${semesterIndex}`}
							className="btn btn-success"
							onClick={handleAddCourse}
						>
							Done
						</label>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddCourse

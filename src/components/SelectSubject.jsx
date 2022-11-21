import totalClasses from "../spring2023.json"

const SelectSubject = ({ subject, setSubject, setNumber }) => {
	const handleChange = (event) => {
		setSubject(event.target.value)
		setNumber("---")
	}

	return (
		<div className="flex flex-col items-center">
			<h2 className="text-xl pb-2">Select Subject</h2>
			<select className="select select-secondary" value={subject} onChange={handleChange}>
				{Object.keys(totalClasses).map((subject, index) => (
					<option key={index}>{subject}</option>
				))}
			</select>
		</div>
	)
}

export default SelectSubject

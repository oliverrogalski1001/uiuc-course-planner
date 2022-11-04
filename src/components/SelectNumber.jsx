import totalClasses from "../spring2023.json"

const SelectNumber = ({ subject, number, setNumber }) => {
	const handleChange = (event) => {
		setNumber(event.target.value)
	}

	return (
		<div className="flex flex-col items-center">
			<h2 className="text-xl pb-2">Select Course Number</h2>
			<select className="select select-secondary" value={number} onChange={handleChange}>
				<option disabled>---</option>
				{totalClasses[subject].map((course) => (
					<option>{course.number}</option>
				))}
			</select>
		</div>
	)
}

export default SelectNumber

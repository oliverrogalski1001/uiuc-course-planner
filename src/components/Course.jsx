const Course = ({ course, deleteCourse }) => {
	return (
		<div className="card card-compact bg-primary text-primary-content shadow-xl m-2">
			<div className="card-body">
				<div className="card-title justify-between">
					<h1 className="">{course.name}</h1>
					<h1 className="">{course.creditHours}</h1>
				</div>
				<p className="text-base">{course.title}</p>
				<div className="card-actions justify-end">
					<p className="underline text-white hover:text-blue-800">
						<a href={course.explorerURL} target="_blank">
							Course Explorer Link
						</a>
					</p>
					<button className="btn btn-square btn-xs" onClick={() => deleteCourse(course)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	)
}

export default Course

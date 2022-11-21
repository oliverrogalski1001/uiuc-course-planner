import { useState } from "react"

const ShareButton = () => {
	let clip
	//navigator.clipboard.readText().then((clipText) => (clip = clipText))
	const [show, setShow] = useState(false)
	const handleClick = () => {
		navigator.clipboard.writeText(document.URL).then(() => setShow(true))
	}

	return (
		<div className="flex flex-row justify-center mt-4">
			<button className="btn" onClick={handleClick}>
				Click to copy the link
			</button>
			{show && <h1>copied</h1>}
		</div>
	)
}

export default ShareButton

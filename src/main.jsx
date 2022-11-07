import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom"
import "./index.css"

const router = createBrowserRouter([
	{
		path: "/uiuc-course-planner",
		element: <App />
	}
])

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)

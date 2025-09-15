import { setupSSEMock } from "./mocks/sseMock" // 新增

setupSSEMock() // 启用模拟

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

const container = document.getElementById("root")
if (!container) throw new Error("未找到 #root 元素")

const root = ReactDOM.createRoot(container)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

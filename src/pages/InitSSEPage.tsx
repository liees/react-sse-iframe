// src/pages/InitSSEPage.tsx
import { useEffect } from "react"
import { messageHub } from "../services/MessageHub"
import { useSSEStatus } from "../hooks/useSSEStatus"

function InitSSEPage() {
    const { status } = useSSEStatus()

    useEffect(() => {
        messageHub.start()
    }, [])

    return (
        <div style={{ padding: 20 }}>
            <h3>✅ SSE 初始化页面</h3>
            <p>
                连接状态: <strong>{status}</strong>
            </p>
            {status === "connecting" && <span>🔄 正在连接...</span>}
            {status === "connected" && <span>🟢 已连接</span>}
            {status === "error" && <span>🔴 连接失败</span>}
        </div>
    )
}

export default InitSSEPage

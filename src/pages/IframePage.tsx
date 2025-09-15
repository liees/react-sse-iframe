// src/pages/IframePage.tsx
import { usePostMessageToIframe } from "../hooks/usePostMessageToIframe"
import { useSSEStatus } from "../hooks/useSSEStatus"
import { useAppSelector } from "../store/hooks"

function IframePage() {
    const { postToIframe } = usePostMessageToIframe()
    const { status } = useSSEStatus()
    const notifications = useAppSelector((state) => state.notification.list)

    return (
        <div style={{ padding: 20 }}>
            <h3>📊 Iframe 控制页面</h3>
            <p>SSE 状态: {status}</p>

            <button onClick={() => postToIframe({ type: "PING" })}>
                发送到 Iframe
            </button>

            <h4>通知列表</h4>
            <ul>
                {notifications.map((n) => (
                    <li key={n.id}>{n.text}</li>
                ))}
            </ul>

            <iframe
                id="my-iframe"
                src="/iframe.html"
                style={{ width: "100%", height: 400, border: "1px solid #ccc" }}
            />
        </div>
    )
}

export default IframePage

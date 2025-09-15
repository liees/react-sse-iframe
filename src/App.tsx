import { useState } from "react"
import { Provider } from "react-redux"
import { store } from "./store/store"
import InitSSEPage from "./pages/InitSSEPage"
import IframePage from "./pages/IframePage"

function App() {
    const [activePage, setActivePage] = useState<"init" | "iframe">("init")

    return (
        <Provider store={store}>
            <div>
                <nav>
                    <button onClick={() => setActivePage("init")}>
                        初始化 SSE
                    </button>
                    <button onClick={() => setActivePage("iframe")}>
                        Iframe 页面
                    </button>
                </nav>

                <hr />

                {activePage === "init" && <InitSSEPage />}
                {activePage === "iframe" && <IframePage />}
            </div>
        </Provider>
    )
}

export default App

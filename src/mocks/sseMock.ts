// src/mocks/sseMock.ts
export function setupSSEMock() {
    // 拦截 EventSource（仅开发环境）
    if (import.meta.env.DEV) {
        const originalEventSource = window.EventSource;

        // @ts-ignore - 模拟 EventSource
        window.EventSource = class EventSource {
            constructor(url) {
                console.log('[Mock] 模拟连接 SSE:', url);

                // 模拟消息推送
                const interval = setInterval(() => {
                    const msg = {
                        id: Date.now(),
                        type: 'NOTIFICATION',
                        payload: { text: `模拟通知 ${new Date().toLocaleTimeString()}` },
                        timestamp: Date.now(),
                        forwardToIframe: Math.random() > 0.5,
                    };

                    // 模拟 onmessage
                    this.onmessage?.({ data: JSON.stringify(msg) });
                }, 3000);

                // 提供关闭方法
                this.close = () => {
                    clearInterval(interval);
                };
            }

            onmessage: ((event: any) => void) | null = null;
            close() { }
        };
    }
}

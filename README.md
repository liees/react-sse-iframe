#### react-sse-iframe-demo


```
src/
├── services/                   # 核心单例服务
│   ├── SSEService.ts           # SSE 连接管理（全局唯一）
│   ├── PostMessageService.ts   # 向 iframe 发送消息
│   └── MessageHub.ts           # 消息中心：接收 → 分发
│
├── store/                      # Redux 状态管理
│   ├── notificationSlice.ts    # 通知状态 slice
│   ├── store.ts                # Redux Store
│   └── hooks.ts                # 类型化 useSelector/useDispatch
│
├── types/                      # 全局类型
│   └── index.ts                # 消息、状态等类型
│
├── hooks/                      # 自定义 Hook
│   ├── useSSEStatus.ts         # 订阅 SSE 状态
│   └── usePostMessageToIframe.ts # 封装 postMessage 调用
│
├── pages/
│   ├── InitSSEPage.tsx         # 负责启动 SSE 的页面
│   └── IframePage.tsx          # 包含 iframe 并消费消息
│
├── App.tsx                     # 根组件（包裹 Provider）
└── main.tsx                    # 入口文件
```

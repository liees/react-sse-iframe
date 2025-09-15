import { SSEMessage, SSEStatus, StatusListener } from '../types';

const SSE_URL = '/api/sse';

class SSEService {
    private static instance: SSEService;

    private eventSource: EventSource | null = null;
    private subscribers: ((msg: SSEMessage) => void)[] = [];
    private statusListeners: StatusListener[] = [];
    private status: SSEStatus = 'idle';

    private constructor() { }

    static getInstance(): SSEService {
        if (!this.instance) {
            this.instance = new SSEService();
        }
        return this.instance;
    }

    getStatus(): SSEStatus {
        return this.status;
    }

    subscribeStatus(listener: StatusListener): () => void {
        this.statusListeners.push(listener);
        listener(this.status);
        return () => {
            this.statusListeners = this.statusListeners.filter(l => l !== listener);
        };
    }

    subscribe(onMessage: (msg: SSEMessage) => void): () => void {
        this.subscribers.push(onMessage);

        if (this.subscribers.length === 1) {
            this.connect();
        }

        return () => {
            this.subscribers = this.subscribers.filter(s => s !== onMessage);
            if (this.subscribers.length === 0) {
                this.disconnect();
            }
        };
    }

    private connect(): void {
        if (this.eventSource) return;

        this.setStatus('connecting');
        this.eventSource = new EventSource(SSE_URL);

        this.eventSource.onopen = () => {
            this.setStatus('connected');
        };

        this.eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                this.subscribers.forEach(s => s(data));
            } catch (err) {
                console.error('[SSE] 解析失败', err);
            }
        };

        this.eventSource.onerror = () => {
            this.setStatus('error');
            this.cleanup();
        };
    }

    private disconnect(): void {
        this.cleanup();
        this.setStatus('disconnected');
    }

    private cleanup(): void {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }
    }

    private setStatus(status: SSEStatus): void {
        if (this.status === status) return;
        this.status = status;
        this.statusListeners.forEach(l => l(status));
    }
}

export const sseService = SSEService.getInstance();

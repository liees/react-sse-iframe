import { SSEMessage, MessageHandler, SSETSTATUS } from '../types';
import { sseService } from './SSEService';
import { postMessageService } from './PostMessageService';
import { addNotification } from '../store/notificationSlice';
import { store } from '../store/store';

class MessageHub {
    private static instance: MessageHub;

    private handlers: MessageHandler[] = [];
    private statusListeners: ((status: SSETSTATUS) => void)[] = [];
    private started = false;

    private constructor() { }

    static getInstance(): MessageHub {
        if (!this.instance) {
            this.instance = new MessageHub();
        }
        return this.instance;
    }

    start(): () => void {
        if (this.started) return () => {};
        this.started = true;

        this.registerHandler(this.notificationHandler);
        this.registerHandler(this.forwardToIframeHandler);
        this.registerHandler(this.commandHandler);

        const unsubscribe = sseService.subscribe((rawMsg) => {
            const msg = this.normalizeMessage(rawMsg);
            this.processMessage(msg);
        });

        const unsubscribeStatus = sseService.subscribeStatus((status) => {
            this.statusListeners.forEach(l => l(status));
        });

        return () => {
            unsubscribe();
            unsubscribeStatus();
        };
    }

    private processMessage(msg: SSEMessage): void {
        this.handlers.forEach(handler => {
            try {
                handler(msg);
            } catch (err) {
                console.error('[MessageHub] 处理失败', msg.type, err);
            }
        });
    }

    private normalizeMessage(raw: any): SSEMessage {
        return {
            id: raw.id || `msg_${Date.now()}`,
            type: raw.type || 'UNKNOWN',
            payload: raw.payload || {},
            timestamp: raw.timestamp || Date.now(),
            forwardToIframe: !!raw.forwardToIframe,
        };
    }

    registerHandler(handler: MessageHandler): void {
        this.handlers.push(handler);
    }

    subscribeStatus(listener: (status: SSETSTATUS) => void): () => void {
        this.statusListeners.push(listener);
        listener(sseService.getStatus());
        return () => {
            this.statusListeners = this.statusListeners.filter(l => l !== listener);
        };
    }

    // 内置处理器
    private notificationHandler: MessageHandler = (msg) => {
        if (msg.type === 'NOTIFICATION') {
            store.dispatch(addNotification({
                text: msg.payload.text || '新通知',
                data: msg.payload,
            }));
        }
    };

    private forwardToIframeHandler: MessageHandler = (msg) => {
        if (msg.forwardToIframe) {
            postMessageService.send(msg.payload);
        }
    };

    private commandHandler: MessageHandler = (msg) => {
        if (msg.type === 'COMMAND') {
            console.log('[Command] 执行:', msg.payload.cmd);
        }
    };
}

export const messageHub = MessageHub.getInstance();

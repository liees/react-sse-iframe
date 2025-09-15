// src/services/PostMessageService.ts
class PostMessageService {
    private static instance: PostMessageService;

    private constructor() { }

    static getInstance(): PostMessageService {
        if (!this.instance) {
            this.instance = new PostMessageService();
        }
        return this.instance;
    }

    send(data: any, targetOrigin = '*'): void {
        const iframe = document.getElementById('my-iframe') as HTMLIFrameElement;
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(data, targetOrigin);
        } else {
            console.warn('[PostMessage] iframe 未找到');
        }
    }
}

export const postMessageService = PostMessageService.getInstance();

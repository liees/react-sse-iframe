export type MessageTypes =
    | 'NOTIFICATION'
    | 'COMMAND'
    | 'USER_ACTION'
    | 'SYSTEM_ALERT'
    | 'CUSTOM_EVENT';

export type SSETSTATUS = 'idle' | 'connecting' | 'connected' | 'error' | 'disconnected';
export interface BaseMessage<T extends MessageTypes = MessageTypes> {
    type: T;
    payload: any;
    timestamp: number;
    id: string;
}

export interface SSEMessage extends BaseMessage {
    forwardToIframe?: boolean;
}

export type SSEStatus = 'idle' | 'connecting' | 'connected' | 'error' | 'disconnected';

export type MessageHandler = (msg: SSEMessage) => void;

export type StatusListener = (status: SSEStatus) => void;

export interface Notification {
    id: string;
    text: string;
    data?: any;
    timestamp: number;
}

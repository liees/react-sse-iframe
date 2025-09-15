import { postMessageService } from '../services/PostMessageService';

export const usePostMessageToIframe = () => {
    const postToIframe = (data: any) => {
        postMessageService.send(data);
    };

    return { postToIframe };
};

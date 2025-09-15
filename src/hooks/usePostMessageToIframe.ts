import { postMessageService } from '../services';

export const usePostMessageToIframe = () => {
    const postToIframe = (data: any) => {
        postMessageService.send(data);
    };

    return { postToIframe };
};

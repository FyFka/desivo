import { useStore } from "vuex";
import { sendDiscussionMessage } from "../api/discussion";
import { key } from "../store";

export const useDiscussion = () => {
  const store = useStore(key);
  const sendMessage = (message: string, projectId: string) => {
    sendDiscussionMessage(message, projectId, store.state.token);
  };

  return { sendMessage };
};

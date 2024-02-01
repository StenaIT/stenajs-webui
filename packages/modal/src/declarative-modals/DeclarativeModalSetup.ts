import ReactModal from "react-modal";

export const setupDeclarativeModals = (htmlElement: string | HTMLElement) => {
  ReactModal.setAppElement(htmlElement);
};

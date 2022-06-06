import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  ReactNode
} from 'react';
import WarningModal from './warning-modal';

const ModalContext = createContext(
  {} as {
    showWarningModal: boolean;
    setShowWarningModal: Dispatch<SetStateAction<boolean>>;
  }
);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [showWarningModal, setShowWarningModal] = useState(false);
  const value = {
    showWarningModal,
    setShowWarningModal
  };

  return (
    <ModalContext.Provider value={value}>
      <WarningModal
        showWarningModal={showWarningModal}
        setShowWarningModal={setShowWarningModal}
      />
      {children}
    </ModalContext.Provider>
  );
};
export const useModal = () => {
  const value = useContext(ModalContext);
  // if context is undefined this means it was used outside of its provider
  // you can throw an error telling that to your fellow developers
  if (!value) {
    throw new Error('useModalContext must be used under <ModalProvider/>');
  }
  return value;
};

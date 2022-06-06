import Modal from '.';
import { Dispatch, SetStateAction } from 'react';

const WarningModal = ({
  showWarningModal,
  setShowWarningModal
}: {
  showWarningModal: boolean;
  setShowWarningModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Modal showModal={showWarningModal} setShowModal={setShowWarningModal}>
      <div className="inline-block w-full max-w-lg py-12 px-8 sm:px-16 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        <div>
          <h3 className="font-semibold text-2xl mb-4">Missing Env Vars</h3>
          <p className="text-gray-500">
            <code className="font-mono">GITHUB_CLIENT_ID</code> and{' '}
            <code className="font-mono">GITHUB_CLIENT_SECRET</code> must be set.
            Read more:{' '}
            <a
              href="https://next-auth.js.org/providers/github"
              target="_blank"
              className="font-medium hover:text-black transition-all ease duration-150"
            >
              https://next-auth.js.org/providers/github ↗
            </a>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default WarningModal;

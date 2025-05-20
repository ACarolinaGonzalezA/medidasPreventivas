export default function Modal({ visible, onClose, children }) {
    if (!visible) return null;
  
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg p-6 max-w-md mx-4 text-center shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    );
  }
  
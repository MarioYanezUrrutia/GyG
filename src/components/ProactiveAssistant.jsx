import React, { useState, useEffect } from 'react';

const ProactiveAssistant = ({ onRequestHelp }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasShown(true);
      }, 10000); // 10 segundos
      return () => clearTimeout(timer);
    }
  }, [hasShown]);

  const handleYes = () => {
    setIsVisible(false);
    onRequestHelp();
  };

  const handleNo = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg shadow-xl max-w-sm z-50 animate-bounce">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            🤖
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm mb-1">¿Necesitas ayuda?</h4>
          <p className="text-xs text-blue-100 mb-3">
            Veo que has estado navegando por un tiempo. ¿Te gustaría que te ayude a encontrar algo específico?
          </p>
          <div className="flex space-x-2">
            <button
              onClick={handleYes}
              className="bg-white text-blue-600 px-3 py-1 rounded text-xs font-medium hover:bg-blue-50 transition-colors"
            >
              Sí, ayúdame
            </button>
            <button
              onClick={handleNo}
              className="bg-blue-500 bg-opacity-50 px-3 py-1 rounded text-xs hover:bg-opacity-70 transition-colors"
            >
              No, gracias
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProactiveAssistant;

// import React, { useState, useEffect } from 'react';

// const ProactiveAssistant = ({ onRequestHelp }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [hasShown, setHasShown] = useState(false);

//   useEffect(() => {
//     if (!hasShown) {
//       const timer = setTimeout(() => {
//         setIsVisible(true);
//         setHasShown(true);
//       }, 10000); // 10 segundos
//       return () => clearTimeout(timer);
//     }
//   }, [hasShown]);

//   const handleYes = () => {
//     setIsVisible(false);
//     onRequestHelp();
//   };

//   const handleNo = () => {
//     setIsVisible(false);
//   };

//   if (!isVisible) return null;

//   return (
//     <div className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg shadow-xl max-w-sm z-50 animate-bounce">
//       <div className="flex items-start space-x-3">
//         <div className="flex-shrink-0">
//           <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
//             🤖
//           </div>
//         </div>
//         <div className="flex-1">
//           <h4 className="font-semibold text-sm mb-1">¿Necesitas ayuda?</h4>
//           <p className="text-xs text-blue-100 mb-3">
//             Veo que has estado navegando por un tiempo. ¿Te gustaría que te ayude a encontrar algo específico?
//           </p>
//           <div className="flex space-x-2">
//             <button
//               onClick={handleYes}
//               className="bg-white text-blue-600 px-3 py-1 rounded text-xs font-medium hover:bg-blue-50 transition-colors"
//             >
//               Sí, ayúdame
//             </button>
//             <button
//               onClick={handleNo}
//               className="bg-blue-500 bg-opacity-50 px-3 py-1 rounded text-xs hover:bg-opacity-70 transition-colors"
//             >
//               No, gracias
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProactiveAssistant;
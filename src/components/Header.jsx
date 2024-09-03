import { useState } from 'react';

import NewChallenge from './NewChallenge.jsx';
import { AnimatePresence, motion } from 'framer-motion';


export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();
  

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      {/* benift roperty defined will animate out when removed from the tree. */}
      <AnimatePresence> 
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>

      <header id="main-header">
        <h1>Your Challenges</h1>
        <motion.button 
          whileHover={{ scale: 1.4, backgroundColor: '#8b11f0'}}
          transition={{ type: 'spring', stiffness: 700  }}
          onClick={handleStartAddNewChallenge} className="button">
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}

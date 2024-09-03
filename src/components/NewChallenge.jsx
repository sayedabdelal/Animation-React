import { useContext, useRef, useState } from 'react';
import { motion, useAnimate, stagger } from 'framer-motion';

import { ChallengesContext } from '../store/challenges-context.jsx';
import Modal from './Modal.jsx';
import images from '../assets/images.js';

export default function NewChallenge({ onDone }) {
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  const [scope, animate] = useAnimate();
  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      animate(
        '#new-challenge input, #new-challenge textarea', // Correct CSS selector for targeting
        { x: [-10, 0, 10, 0]}, // Animation properties
        { type: 'spring', duration: 0.2, delay: stagger(0.1) } // Adjusted stagger delay
      );
      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <motion.ul
  id="new-challenge-images"
  initial="hidden"
  animate="visible"
  exit="exit"
  variants={{
    hidden: {}, // Empty hidden state for the parent (no special action needed)
    visible: {
      transition: {
        staggerChildren: 0.05, // Stagger the appearance of child components
      },
    },
  }}
>
  {images.map((image) => (
    <motion.li
      variants={{
        hidden: { opacity: 0, scale: 0.2 },
        visible: { opacity: 1, scale: [.6, .9, 1.2, 1] },
        exit: { opacity: 0, scale: 0.5 }, // Exit animation to quickly fade out and shrink
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }} // Adjust the stiffness and damping for quicker response
      key={image.alt}
      onClick={() => handleSelectImage(image)}
      className={selectedImage === image ? 'selected' : undefined}
    >
      <img {...image} />
    </motion.li>
  ))}
</motion.ul>


        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
export default () => {
  const isOpen = useState('pro-modal', () => false);

  const toggleModal = (modalState: boolean) => {
    isOpen.value = modalState
  }

  return {
    isOpen,
    toggleModal,
  }
};
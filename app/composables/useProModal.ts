export default () => {
  const isOpen = ref(false);

  const toggleModal = (modalState: boolean) => {
    isOpen.value = modalState
  }

  return {
    isOpen,
    toggleModal,
  }
};
import { useToast } from '@chakra-ui/react';

const useCustomToast = () => {
  const toast = useToast();

  const showToast = (
    description: string,
    status: 'info' | 'warning' | 'success' | 'error' | 'loading' | undefined
  ) => {
    const toastId = `toast-${status}-${description}`;

    if (!toast.isActive(toastId)) {
      toast({
        id: toastId, 
        position: 'top-right',
        description,
        status,
        isClosable: true,
        duration: 3000,
      });
    }
  };

  return showToast;
};

export default useCustomToast;

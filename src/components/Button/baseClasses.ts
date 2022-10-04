export const baseClasses = {
  base: 'inline-flex  py-2 px-4 rounded align-middle',
  disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
  variant: {
    solid: {
      primary: 'bg-blue-500 text-white hover:bg-blue-600 border-blue-500',
      secondary: 'bg-gray-500 text-white hover:bg-gray-600 border-gray-500',
      danger: 'bg-red-500 text-white hover:bg-red-600 border-red-500',
      inherit: 'bg-inherit-500 text-white hover:bg-inherit-600 border-inherit-500',
    },
    outline: {
      primary: 'text-blue-500 hover:bg-blue-500 hover:text-white border-blue-500',
      secondary: 'text-gray-500 hover:bg-gray-500 hover:text-white border-gray-500',
      danger: 'text-red-500 hover:bg-red-500 hover:text-white border-red-500',
      inherit: 'text-inherit-500 hover:bg-inherit-500 hover:text-white border-inherit-500',
    },
    ghost: {
      primary:
        'text-blue-500 hover:bg-blue-500 hover:text-white border-transparent hover:bg-opacity-25',
      secondary:
        'text-gray-500 hover:bg-gray-500 hover:text-white border-transparent hover:bg-opacity-25',
      danger:
        'text-red-500 hover:bg-red-500 hover:text-white border-transparent hover:bg-opacity-25',
      inherit:
        'text-inherit-500 hover:bg-inherit-500 hover:text-inherit-500 border-transparent hover:bg-opacity-25',
    },
  },
}

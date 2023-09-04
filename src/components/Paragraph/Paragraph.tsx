import { forwardRef } from 'react'
import clsx from 'clsx'

export type ParagraphProps = {
  className?: string
} & React.ComponentPropsWithoutRef<'p'>

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={clsx('mb-3 text-gray-500 dark:text-gray-400', className)}
        {...props}
      />
    )
  },
)

Paragraph.displayName = 'Paragraph'

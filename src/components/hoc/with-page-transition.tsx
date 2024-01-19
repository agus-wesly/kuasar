import { motion } from 'framer-motion'

export default function withPageTransition(
  Component: (props: any) => JSX.Element
) {
  return function ComponentWithTransition() {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Component />
      </motion.div>
    )
  }
}

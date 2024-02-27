import { useRouter } from "next/router"
import { AnimatePresence, motion } from "framer-motion"
import { LayoutStyle } from "./LayoutStyle"
import { Header } from "./header"
 
const defaultVariants = {
  out: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
}

const onExitCompleteHandler = () => {
  window.scrollTo(0, 0)
}

export const Layout = ({ children}: any) => {
  
  const { asPath } = useRouter();

  return (
    <LayoutStyle>
      <Header/>
      <section className="main-section">
        <AnimatePresence mode="wait" onExitComplete={onExitCompleteHandler}>
          <motion.div
            key={asPath}
            variants={defaultVariants}
            animate="in"
            initial="out"
            exit="out"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </section>
    </LayoutStyle>
  )
}

// import { Provider as QuizProvider } from "./quiz"
import { QuizProvider } from "./quiz"
import { TaskProvider } from "./task"

export default function Provider({children}) {
  return (
    <QuizProvider>
      <TaskProvider>
        {children}
      </TaskProvider>
    </QuizProvider>
  )
}


import {Button} from "./components/ui/button"
import {PlusIcon} from "./assets/icons"

function App() {

  return (
    <>
      <Button size="lg" variant="primary" icon={<PlusIcon size={"lg"} />} text="Enter"  />
      <Button size="sm" variant="secondary" icon={<PlusIcon size={"md"} />} text="Exit"  />
    </>
  )
}

export default App

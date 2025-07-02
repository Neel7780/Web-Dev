
// import {Button} from "./components/ui/button"
import {Card} from "./components/ui/cards"
// import {PlusIcon} from "./assets/icons"

function App() {

  return (
    <>
      {/* <Button size="lg" variant="primary" icon={<PlusIcon size={"lg"} />} text="Enter"  />
      <Button size="sm" variant="secondary" icon={<PlusIcon size={"md"} />} text="Exit"  /> */}
      <div className="flex gap-4">
        <Card title="Hi there" type="youtube" link="https://youtube.com/ALesKfHj9n4?si=landiGtOe2qae0Wt" />
        <Card title="Hi there" type="twitter" link="https://x.com/elonmusk/status/1940029010693472616" />
      </div>
    </>
  )
}

export default App

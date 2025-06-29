import { RecoilRoot, useSetRecoilState, useRecoilValue, atom, selector} from 'recoil'
//useRecoilstate - gets both value and setvalue, useRecoilvalue - only value

// recoil doesnt work with react 19RC or later ig

function App() {
  return (
    <>  
      <RecoilRoot>
        <Counter />
      </RecoilRoot>
    </>
  )
}

//atom(same as useState but better as it prevents re-rendering) for counter
const counterAtom = atom({  // creating atoms in another file is a good practice
  key : "counter", 
  default : 0
})

const isEven = selector({
  key : "isevenselector",
  get : function({get}){
    const counter = get(counterAtom)
    return (counter % 2) === 0 
  }
})

function Counter(){
  const count = useRecoilValue(counterAtom)
  console.log("Count :", count)
  return (
    <>
      {count}
      <Increase/>
      <Decrease/>
      <State/>
    </>
  )
}

function State(){
  const checkEven = useRecoilValue(isEven)
  return (
    <div>
      {checkEven ? "Even" : "Odd"}
    </div>
  )
}

function Increase(){
  const setCount = useSetRecoilState(counterAtom)

  function increase(){
    return setCount((c) => c + 2)
  }

  return (
    <div>
      <button onClick={increase}>Increase</button>
    </div>
  )
}

function Decrease(){
  const setCount = useSetRecoilState(counterAtom)

  function decrease(){
    return setCount((c) => c - 1)
  }

  return (
    <div>
      <button onClick={decrease}>Decrease</button>
    </div>
  )
}

export default App

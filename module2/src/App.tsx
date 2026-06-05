import { Fragment, useState, useActionState, useEffect } from 'react'
import './App.css'

interface Fruit {
  id: number;
  name: string;
  liked: boolean;
  inStock: boolean;
}
const INITIAL_FRUITS = [
  { id: 1, name: "apple", liked: false, inStock: true },
  { id: 2, name: "banana", liked: false, inStock: false },
  { id: 3, name: "orange", liked: false, inStock: true }]

async function addFruitAction(prevState: any, formData: FormData) {
  const name = formData.get('name') as string
  if (name.trim() === '') return { success: false, error: 'fill the fruit name input' }
  return { success: true, name }
}

function App() {

  const [state, formAction, isPending] = useActionState(addFruitAction, null)
  const [fruits, setFruits] = useState<Fruit[]>([])
  const [showLikedOnly, setShowLikedOnly] = useState<boolean>(false)
  
    useEffect(() => {
      if (state?.success && state.name) {
        addNewFruit(state.name)
      }
    }, [state])
  
  function toggleLike(id: number) {
    setFruits(fruits.map(
      f => f.id === id ? { ...f, liked: !f.liked } : f
    ))
  }

  const loadFruits = () => {
    setFruits(INITIAL_FRUITS)
  }

  const filteredFruits = showLikedOnly ? fruits.filter(f => f.liked) : fruits

  const addNewFruit = (name: string ) => {
    setFruits(fruits => {
      const base = fruits.length === 0 ? INITIAL_FRUITS : fruits
      return [...base, { id: base.length + 1, name, liked: false, inStock: false }]
    })
  }


  return (
    <>
      <h1>hello world</h1>
      <button onClick={loadFruits} style={{ width: 'auto', height: 50, backgroundColor: 'blue', color: 'white', fontSize: 20, borderRadius: 10, margin: '0 auto' }}>
        load the list
      </button>
      <input
        type="checkbox"
        checked={showLikedOnly}
        onChange={(e) => { setShowLikedOnly(e.target.checked) }}
      />
      <label >show liked only </label>
      <br />
      <form action={formAction}>
        <input
          name="name"
          placeholder="Enter a new fruit"
          disabled={isPending}
        />
        <button type="submit" disabled={isPending} style={{ width: 'auto', height: 50, backgroundColor: 'green', color: 'white', fontSize: 20, borderRadius: 10, margin: '0 auto' }}>
          {isPending ? 'adding...' : "add new fruit"}
        </button>
        {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
        {state?.success && <p style={{ color: 'green' }}>fruit added successfully</p>}
      </form>
      <br />
      {fruits.length === 0
        ? null :
        filteredFruits.length > 0 ? filteredFruits.map((f) => (
          <Fragment key={f.id}>
            <p >{f.name} </p>
            <button style={{ borderRadius: 50, width: 'auto', margin: '0 auto', backgroundColor: f.liked ? 'red' : 'grey' }} onClick={() => { toggleLike(f.id) }}> liked </button>
          </Fragment>
        )) : <h2>theres no liked fruits yet </h2>
      }
    </>
  )
}

export default App

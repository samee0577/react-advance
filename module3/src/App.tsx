import usePersoninfo from './usePersoninfo'

function App() {
  
 const { state, dispatch } = usePersoninfo()

  return (
    <>
      {state.name?.length > 0 ? <h1>well, Hello {state.name} !</h1> : <h1>who are you?</h1>}
      {state.age ? <p>ohhH! congrats on your {state.age} years of experience in life</p> : <p>age 0 ? are you a new born.</p>}

      <label style={{ marginTop: "40px", fontSize: "18px", alignSelf: "left" }}>Name</label>

      <input type="text" value={state.name} onChange={(e) => { dispatch({ type: 'SET_NAME', payload: e.target.value as string }) }} placeholder='enter your name'
        style={{ width: 'auto', margin: '0 auto', height: 25, borderRadius: 20, padding: "10px", fontSize: "18px", border: "1px solid black" }} />

      <label style={{ fontSize: "18px", alignSelf: "left" }}>Age</label>
      <input value={state.age} onChange={(e) => { dispatch({ type: "SET_AGE", payload: parseInt(e.target.value) || 0 }) }}
        style={{ marginLeft: 10, padding: "10px", fontSize: "18px", border: "1px solid black", borderRadius: 20, margin: "0 auto", height: 25 }} />

      <button onClick={() => dispatch({ type: 'CLEAR_ALL' })}
        style={{ margin: "10px auto", padding: "10px", fontSize: "18px", border: "1px solid black", borderRadius: 20 }}>
        clear
      </button>
    </>
  )
}

export default App

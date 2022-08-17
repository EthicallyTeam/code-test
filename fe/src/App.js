import logo from './logo.svg';
import './App.css';
import React from React
import { useForm, Controller } from "react-hook-form";
import "./styles.css";



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
export default App;

const Checkbox = React.forwardRef(
  ({ label, name, value, onChange, defaultChecked, ...rest }, forwardedRef) => {
    const [checked, setChecked] = React.useState(defaultChecked);

    React.useEffect(() => {
      if (onChange) {
        onChange(checked);
      }
    }, [checked]);

    return (
      <div onClick={() => setChecked(!checked)} style={{ cursor: "pointer" }}>
        <input
          style={{ display: "none" }}
          ref={forwardedRef}
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          onChange={e => {
            setChecked(e.target.checked);
          }}
        />
        [{checked ? "X" : " "}]{label}
      </div>
    );
  }
);

function useCombinedRefs(...refs) {
  const targetRef = React.useRef();

  React.useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}

const CombinedRefCheckbox = React.forwardRef(
  ({ label, name, value, onChange, defaultChecked, ...rest }, forwardedRef) => {
    const [checked, setChecked] = React.useState(defaultChecked || false);

    const innerRef = React.useRef(null);
    const combinedRef = useCombinedRefs(forwardedRef, innerRef);

    const setCheckedInput = checked => {
      if (innerRef.current.checked !== checked) {
        innerRef.current.click();
      }
    };

    React.useEffect(() => {
      setCheckedInput(checked);
      if (onChange) {
        onChange(checked);
      }
    }, [checked]);

    return (
      <div onClick={() => setChecked(!checked)} style={{ cursor: "pointer" }}>
        <input
          style={{ display: "none" }}
          ref={combinedRef}
          type="checkbox"
          name={name}
          value={value}
          defaultChecked={checked}
          onChange={e => {
            setChecked(e.target.checked);
          }}
        />
        [{checked ? "X" : " "}]{label}
      </div>
    );
  }
);

export default function App() {
  const onSubmit = data => {
    alert(JSON.stringify(data));
  };

  const { handleSubmit, register, errors, control } = useForm();

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <input
            ref={register({ required: "This is required" })}
            name="Characteristics"
            value={true}
            type="checkbox"
          />
          Characteristics
        </label>
        {errors.Characteristics && <p class="error">{errors.Characteristics.message}</p>}
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

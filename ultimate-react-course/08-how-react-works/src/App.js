import { useState } from "react";

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "React lets you build user interfaces out of individual pieces called components. These components are reusable and can manage their own state. React uses a virtual DOM to efficiently update only the parts of the page that change, making your apps fast and responsive. Whether you're building a simple button or a complex dashboard, React's component-based approach helps you write maintainable code.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "State represents data that can change over time in your component. When you use useState or useReducer, you're creating a home for that data within your component. React watches this state, and whenever it changes, React automatically re-renders your component to reflect the new data. This makes it easy to build interactive UIs where user actions like clicking buttons or typing in forms immediately update what's displayed on screen.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Props are how components talk to each other. Just like a function takes parameters, a component receives props from its parent. Props make components flexible and reusable - the same Button component can display different text, colors, or handle different click events based on the props you pass. Props flow downward from parent to child, creating a clear data flow that makes your app easier to understand and debug.",
  },
];

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

console.log(<DifferentContent test={23} />);
console.log(DifferentContent());

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {activeTab <= 2 ? (
        <TabContent item={content.at(activeTab)} />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}

function Tab({ num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  function handleInc() {
    setLikes(likes + 1);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button>Undo</button>
        <button>Undo in 2s</button>
      </div>
    </div>
  );
}

function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}

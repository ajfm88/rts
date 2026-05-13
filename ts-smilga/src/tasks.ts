// ## Tasks - Part 2
const btn = document.querySelector(".btn");

btn?.addEventListener("click", () => {
  console.log("something");
});

if (btn) {
  // do something
}

/*
The ! operator in TypeScript is officially known as the Non-null assertion operator. 
It is used to assert that its preceding expression is not null or undefined.
*/
const btn2 = document.querySelector(".btn2")!;

btn2.addEventListener("click", () => {
  console.log("something");
});

/*
Element is the most general base class from which all element objects 
(i.e. objects that represent elements) in a Document inherit. 
It only has methods and properties common to all kinds of elements. 
More specific classes inherit from Element.
*/
const btn3 = document.querySelector<HTMLButtonElement>(".selector")!;

btn3.disabled = true;

const btn4 = document.querySelector(".selector")! as HTMLButtonElement;

btn4.disabled = true;

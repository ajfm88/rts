/*
## Classes - Intro

Classes in JavaScript are a blueprint for creating objects. 
They encapsulate data with code to manipulate that data. 
Classes in JavaScript support inheritance and can be used to 
create more complex data structures.

A constructor in a class is a special method that gets called 
when you create a new instance of the class. It's often used 
to set the initial state of the object.
*/

class Book {
  title: string;
  author: string;
  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }
}

const deepWork = new Book("deep work ", "cal newport");

/*
## Classes - Instance Property / Default Property

The checkedOut property in Book class is an instance property (or member variable). 
It's not specifically set in the constructor, so it could also be referred to as a 
default property or a property with a default value.
*/
class Book2 {
  title: string;
  author: string;
  checkedOut: boolean = false;
  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }
}

const deepWorkBook = new Book2("deep work ", "cal newport");
deepWorkBook.checkedOut = true;
// deepWorkBook.checkedOut = 'something else';

/*
## Classes - ReadOnly Modifier
- readonly modifier
*/
class Book3 {
  readonly title: string;
  author: string;
  checkedOut: boolean = false;
  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }
}

const deepWork3 = new Book3("deep work ", "cal newport");

deepWork3.title = "something else";

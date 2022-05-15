//class and prototype
class Person {
  constructor(
    firstName,
    lastName,
    fullName,
    profession,
    company,
    currentPosition
  ) {
    this.firstName = firstName;
    this.fullName = fullName;
    this.lastName = lastName;
    this.profession = profession;
    this.company = company;
    this.currentPosition = currentPosition;
  }
}
//curring //closure
Person.prototype.age = (date) => {
  return (month) => {
    return (year) => {
      return `I was born on ${date}-${month}-${year}`;
    };
  };
};

const me = {
  firstName: "shaurya",
  lastName: "sethi",
};

const getFullName = function () {
  return this.firstName + " " + this.lastName;
};

const getFirstName = function () {
  return this.firstName;
};

const getLastName = function () {
  return this.lastName;
};
//bind //call //apply
const myFullName = getFullName.bind(me);
const myFirstName = getFirstName.call(me);
const myLastName = getLastName.apply(me);

const shaurya = new Person(
  myFirstName,
  myLastName,
  myFullName(),
  "Software Engineer",
  "CGInfinity",
  2001,
  "Intern"
);

const navbarBrand = document.querySelector(".navbar-brand");
navbarBrand.textContent = shaurya.firstName.toUpperCase();

const heroTitle = document.querySelector(".hero_title");
heroTitle.textContent = `Hi, it's me ${
  shaurya.firstName.charAt(0).toUpperCase() + shaurya.firstName.substr(1)
}`;
const myDOB = document.querySelector(".my-DOB");
myDOB.textContent = shaurya.age(11)(9)(2001);

const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};

const onscroll = (el, listener) => {
  el.addEventListener("scroll", listener);
};

// add class navbarDark on navbar scroll
const header = document.querySelector(".navbar");
console.log(header);
window.onscroll = function () {
  const top = window.scrollY;
  if (top >= 100) {
    header.classList.add("navbarDark");
  } else {
    header.classList.remove("navbarDark");
  }
};
// collapse navbar after click on small devices
const navLinks = document.querySelectorAll(".nav-item");
const menuToggle = document.getElementById("navbarSupportedContent");

navLinks.forEach((l) => {
  l.addEventListener("click", () => {
    new bootstrap.Collapse(menuToggle).toggle();
  });
});
//skills should animate when user scroll to section of skills
let skilsContent = select(".skills-content");
if (skilsContent) {
  new Waypoint({
    element: skilsContent,
    offset: "80%",
    handler: function (direction) {
      let progress = select(".progress .progress-bar", true);
      progress.forEach((el) => {
        el.style.width = el.getAttribute("aria-valuenow") + "%";
      });
    },
  });
}
//back to top button
let backtotop = select(".back-to-top");
if (backtotop) {
  const toggleBacktotop = () => {
    if (window.scrollY > 100) {
      backtotop.classList.add("active");
    } else {
      backtotop.classList.remove("active");
    }
  };
  window.addEventListener("load", toggleBacktotop);
  onscroll(document, toggleBacktotop);
}
//testimonials using promise/ promise chain?/
const apiCall = () => {
  axios
    .get("https://testimonialapi.toolcarton.com/api")
    .then(function (response) {
      // handle success
      for (let i = 0; i <= 5; i++) {
        const avatar = document.querySelector(`.testimonial-avatar-${i}`);
        const position = document.querySelector(`.testimonial-position-${i}`);
        const description = document.querySelector(
          `.testimonial-description-${i}`
        );
        position.textContent = response.data[i].designation;
        description.textContent = response.data[i].lorem;
        avatar.src = response.data[i].avatar;
      }

      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

window.addEventListener("load", apiCall);

//api call for a random programming quote using aync/await
document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const button = document.querySelector(".fetch-new-quote");
  const quote = document.querySelector("blockquote p");
  const cite = document.querySelector("blockquote cite");
  console.log(button);
  async function updateQuote() {
    // Fetch a random quote from the Quotable API
    const response = await fetch(
      "https://programming-quotes-api.herokuapp.com/Quotes/random"
    );
    const data = await response.json();
    if (response.ok) {
      // Update DOM elements
      quote.textContent = data.en;
      cite.textContent = data.author;
    } else {
      quote.textContent = "An error occured";
      console.log(data);
    }
  }

  // Attach an event listener to the `button`
  button.addEventListener("click", updateQuote);

  // call updateQuote once when page loads
  updateQuote();
});

const modal = document.querySelector("#exampleModalCenter");

document.querySelectorAll("#toggleModal").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.toggle("modal-open");
    document.body.classList.toggle("hide-overflow");
  });
});

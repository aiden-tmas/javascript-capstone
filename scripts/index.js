let userList = [];
let firstNames = (async () => {
  const rawResponse = await fetch(
    "https://devpipeline-mock-api.herokuapp.com/api/auth/login",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "aiden@devpipeline.com",
        password: "Itsprimetimeforlean69!!",
      }),
    }
  );
  const content = await rawResponse.json();
  let users = content.users;
  const obj = users.forEach((user) => {
    addPerson(Object.values(user)[1]);
    userList.push(Object.values(user)[1]);
    console.log(Object.values(user)[1]);
  });
})();

console.log(userList);

firstNames.catch((err) => console.error("something went wrong", err));

const nameList = document.getElementById("names-li");
const chosenList = [];
const shuffleButton = document.getElementById("shuffle-button");

function switchName(name) {
  const header = document.getElementById("poor-soul");

  header.innerText = `${name}`;
}

function addPerson(personName) {
  const parentDiv = document.getElementById("students-container");
  const mainDiv = document.createElement("div");
  const studentDiv = document.createElement("div");
  const name = document.createElement("span");
  const score = document.createElement("span");
  const addButton = document.createElement("button");
  const minusButton = document.createElement("button");
  const enter = document.createElement("br");
  const buttons = document.createElement("div");

  mainDiv.className = "student-container";
  studentDiv.className = "student-wrapper";
  score.innerText = "1";
  addButton.innerText = "+";
  addButton.className = "plus-button";
  minusButton.innerText = "-";
  minusButton.className = "minus-button";
  name.innerText = `${personName} : `;
  buttons.className = "buttons";

  name.appendChild(score);

  buttons.appendChild(addButton);
  buttons.appendChild(minusButton);

  studentDiv.appendChild(name);
  studentDiv.appendChild(enter);
  studentDiv.appendChild(buttons);
  // studentDiv.appendChild(addButton);
  // studentDiv.appendChild(minusButton);

  mainDiv.appendChild(studentDiv);
  parentDiv.appendChild(mainDiv);

  addButton.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.firstElementChild.firstElementChild.innerText =
      Number(
        e.target.parentElement.parentElement.firstElementChild.firstElementChild
          .innerText
      ) + 1;
    console.log(
      e.target.parentElement.parentElement.firstElementChild.firstElementChild
        .innerText
    );
  });

  minusButton.addEventListener("click", (e) => {
    if (
      Number(
        e.target.parentElement.parentElement.firstElementChild.firstElementChild
          .innerText
      ) > 0
    ) {
      e.target.parentElement.parentElement.firstElementChild.firstElementChild.innerText =
        Number(
          e.target.parentElement.parentElement.firstElementChild
            .firstElementChild.innerText
        ) - 1;
    }
    console.log(
      e.target.parentElement.parentElement.firstElementChild.firstElementChild
        .innerText
    );
  });
}

function chosenCheck(name) {
  for (i in chosenList) {
    if (chosenList[i] === name) {
      return false;
    }
  }
  return true;
}

function determineVictim() {
  let student = Math.floor(Math.random() * userList.length);
  if (chosenCheck(userList[student])) {
    switchName(userList[student]);
    chosenList.push();
  } else {
    student = Math.floor(Math.random() * userList.length);
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function main() {
  for (let name of userList) {
    await sleep(100);
    switchName(name);
  }

  determineVictim();
}

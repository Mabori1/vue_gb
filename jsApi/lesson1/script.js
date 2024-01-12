let jsonData = [
  {
    id: 1,
    name: "Йога",
    time: "10:00 - 11:00",
    maxParticipants: 15,
    currentParticipants: 8,
  },
  {
    id: 2,
    name: "Пилатес",
    time: "11:30 - 12:30",
    maxParticipants: 10,
    currentParticipants: 5,
  },
  {
    id: 3,
    name: "Кроссфит",
    time: "13:00 - 14:00",
    maxParticipants: 20,
    currentParticipants: 15,
  },
  {
    id: 4,
    name: "Танцы",
    time: "14:30 - 15:30",
    maxParticipants: 12,
    currentParticipants: 10,
  },
  {
    id: 5,
    name: "Бокс",
    time: "16:00 - 17:00",
    maxParticipants: 8,
    currentParticipants: 6,
  },
];

const table = document.getElementById("table");

loadData();

jsonData.forEach(function (data) {
  const row = table.insertRow();

  const nameCell = row.insertCell();
  nameCell.innerHTML = data.name;

  const timeCell = row.insertCell();
  timeCell.innerHTML = data.time;

  const maxParticipantsCell = row.insertCell();
  maxParticipantsCell.innerHTML = data.maxParticipants;

  const currentParticipantsCell = row.insertCell();
  currentParticipantsCell.innerHTML = data.currentParticipants;

  const buttonCell = row.insertCell();
  const button = document.createElement("button");
  button.innerHTML = "Записаться";

  button.addEventListener("click", function () {
    if (data.currentParticipants === data.maxParticipants) {
      button.disabled = true;
    }
    if (button.innerHTML === "Записаться") {
      if (data.currentParticipants < data.maxParticipants) {
        data.currentParticipants++;
        currentParticipantsCell.innerHTML = data.currentParticipants;

        button.disabled = true;
        saveData();

        const cancelButton = document.createElement("button");
        cancelButton.innerHTML = "Отменить запись";

        cancelButton.addEventListener("click", function () {
          data.currentParticipants--;
          currentParticipantsCell.innerHTML = data.currentParticipants;

          saveData();
          button.disabled = false;
          button.parentNode.removeChild(cancelButton);
        });

        button.parentNode.insertBefore(cancelButton, button.nextSibling);
      }
    }
  });

  buttonCell.appendChild(button);

  if (data.currentParticipants === data.maxParticipants) {
    button.disabled = true;
  }
});

function saveData() {
  localStorage.setItem("jsonData", JSON.stringify(jsonData));
}
function loadData() {
  const savedData = localStorage.getItem("jsonData");
  if (savedData) {
    jsonData = JSON.parse(savedData);
  }
}

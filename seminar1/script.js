Vue.createApp({
  data() {
    return {
      buttonText: "Перевернуть",
      listOfElements: ["элемент списка 1", "элемент списка 2"],
      newElement: "Новый элемент списка",
    };
  },
  methods: {
    reverseButtonText() {
      this.buttonText = this.buttonText.split("").reverse().join("");
    },
    addNewElementToList() {
      this.listOfElements.push(this.newElement);
    },
    deleteElementFromList(event) {
      event.target.remove();
    },
  },
}).mount("#app");

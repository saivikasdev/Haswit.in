const whatsAppClient = require("@green-api/whatsapp-api-client");

const phone_numbers =[+919182783270,+917702795038,+919573604021];


for (var i in phone_numbers) {
const restAPI = whatsAppClient.restAPI({
  idInstance: "1101800560",
  apiTokenInstance: "9a944f3506bd428db020dc4eadf20466c60e73ee599b41d2a0 ",
});

restAPI.message.sendMessage("+917702795038", phone_numbers[i] , "hello world").then((data) => {
  console.log(data);
});
}
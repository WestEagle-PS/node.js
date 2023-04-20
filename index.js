const { program } = require("commander");

const contactsService = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsService.listContacts();
      return console.table(allContacts);

    case "get":
      const contactById = await contactsService.getContactById(id);
      return console.log(contactById);

    case "add":
      const newContact = await contactsService.addContact(name, email, phone);
      return console.log(newContact);

    case "remove":
      const deleteContact = await contactsService.removeContact(id);
      return console.log(deleteContact);

    case "update":
      const updateContact = await contactsService.updateContact(id, {
        name,
        email,
        phone,
      });
      return console.log(updateContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-em, --email <type>")
  .option("-ph, --phone <type>");

program.parse();

const options = program.opts();
invokeAction(options);

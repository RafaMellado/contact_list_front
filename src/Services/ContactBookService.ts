import RestService from "./RestService";

class ContactBookService {
  index() {
    return RestService.index("/contact_books").then((response) =>
      response.json()
    );
  }
}

export default new ContactBookService();

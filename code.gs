/**
 * Grabs details about an ISBN from GoogleBooks.
 *
 * @param {isbn} The ISBN we are looking for.  I think it can be any format.
 * @param {detail} Tag you want.  title, subtitle, authors, printType, pageCount, publisher, publishedDate, webReaderLink.
 * @customfunction
 */

function GETBOOKDETAILS(argisbn,argdetail) {

  // Throw a hook to API using ISBN code.
  var isbn = argisbn;
  var detail = argdetail;

  var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn + "&country=US";

  var response = UrlFetchApp.fetch(url);
  var results = JSON.parse(response);

  if (results.totalItems) {

    var book = results.items[0];

    var title = (book["volumeInfo"]["title"]);
    var subtitle = (book["volumeInfo"]["subtitle"]);
    var authors = (book["volumeInfo"]["authors"]);
    var printType = (book["volumeInfo"]["printType"]);
    var pageCount = (book["volumeInfo"]["pageCount"]);
    var publisher = (book["volumeInfo"]["publisher"]);
    var publishedDate = (book["volumeInfo"]["publishedDate"]);
    var webReaderLink = (book["accessInfo"]["webReaderLink"]);
    //
    if (title == "ISBN Review"){
      return "";
    }

    switch(detail){
      case "title":
        return title;break;
      case "subtitle":
        return subtitle;break;
      case "authors":
      case "author":
        return authors;break;
      case "printType":
        return printType;
        break;
      case "pageCount":
        return pageCount; break;
      case "publisher":
        return publisher;
      case "link":
        return webReaderLink; break;
      case "date":
      case "publishedDate":
        return publishedDate; break;

    default:
    return "Bad param";
    break;

  }


    // For debugging
    Logger.log(book);

  }

}


//This is all canned code from Google
/* What should the add-on do after it is installed */
function onInstall() {
  onOpen();
}

/* What should the add-on do when a document is opened */
function onOpen() {
  SpreadsheetApp.getUi()
  .createAddonMenu() // Add a new option in the Google Docs Add-ons Menu
  .addItem("Call the Book Hound", "showSidebar")
  //.showSidebar()
  .addToUi();  // Run the showSidebar function when someone clicks the menu
}

/* Show a 300px sidebar with the HTML from googlemaps.html */
function showSidebar() {
  var html = HtmlService.createTemplateFromFile("Librarian")
    .evaluate()
    .setTitle("The BookHound"); // The title shows in the sidebar
  SpreadsheetApp.getUi().showSidebar(html);
}

/* This Google Script function does all the magic. */
function insertGoogleMap(e) {
  var map = Maps.newStaticMap()
    .setSize(800, 600) // Insert a Google Map 800x600 px
    .setZoom(15)
    .setCenter(e); // e contains the address entered by the user

  SpreadsheetApp.getActiveDocument()
    .getCursor() // Find the location of the cursor in the document
    .insertInlineImage(map.getBlob()); // insert the image at the cursor
}

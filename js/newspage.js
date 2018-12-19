/*
    Erzeuge einen News-Feed durch RSS
    https://github.com/sdepold/jquery-rss
*/
const rss_url = "https://cryptocurrencynews.com/feed/";

const outerHtml = '<div class="news">{entries}</div>';

const innerHtml = '<article class="message"> <div class="message-body columns is-mobile"> <div class="column is-one-fifth"> <figure class="image"> <img src={teaserImage} </figure> </div><div class="column"> <strong>{title}</strong><br><p>{shortBody}</p><br><a href="{url}">Mehr...</a></div></div></article>';

// Wie der Feed dargestellt werden soll.
const options = {
  // Anzahl der Einträge
  limit: 10,

  // Verschlüsselte Verbindung
  ssl: true,

  // HTML Template für die Liste
  layoutTemplate: outerHtml,

  // HTML Template für die Einträge
  entryTemplate: innerHtml,

  // Datum-Format
  // Format: http://momentjs.com/docs/#/displaying/
  dateFormat: 'Do MMMM YYYY, kk:mm:ss',

  // Effekt zum Darstellen der Einträge
  // Mögliche Werte: 'show', 'slide', 'slideFast', 'slideSynced', 'slideFastSynced'
  effect: 'slide',

  // Wird ausgeführt bei einem Error
  error: function(){},

  // Wird ausgeführt bei erfolgreichem Laden
  success: function(){},

  // Wird ausgeführt bei erfolgreichem Laden vor der HTML Generierung
  onData: function(){
    $("#current-site .button").remove();
  },
}

function loaded() {
  $("#current-site").rss(rss_url, options);
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

  });
}

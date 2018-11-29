/*
    Erzeuge einen News-Feed durch RSS
    https://github.com/sdepold/jquery-rss
*/
const rss_url = "https://cryptocurrencynews.com/feed/";

const outerHtml = '<ul class="news">{entries}</ul>';

const innerHtml = '<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>';

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
  onData: function(){},
}

function loaded() {
  $("#current-site").rss(rss_url, options);
}

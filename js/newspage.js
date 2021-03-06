/*------------------------------------------------------------/
/     Skript für automatischen Newsfeed                       /
/     -> RSS-Feed: https://cryptocurrencynews.com/feed/       /
/     -> Jquery-Rss: https://github.com/sdepold/jquery-rss    /
/------------------------------------------------------------*/

// Feed-URL und HTML Templates als Variablen
const rss_url = "https://cryptocurrencynews.com/feed/";
const outerHtml = '<div class="news">{entries}</div>';
const innerHtml = '<div class="box"> <div class="columns is-mobile"> <div class="column is-one-fifth-desktop is-one-quarter-tablet is-one-third-mobile"> <figure class="image"> <img src={teaserImage} </figure> </div><div class="column"> <strong>{title}</strong><br><p>{shortBody}</p><br><a href="{url}">Mehr...</a></div></div></div>';


// Wie der Feed dargestellt werden soll.
// -> Einstellungen für Jquery-RSS
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

// Ausführen nach Laden des Dokuments
$( document ).ready(function() {

  // Erstelle RSS News Feed
  $("#current-site").rss(rss_url, options);

});

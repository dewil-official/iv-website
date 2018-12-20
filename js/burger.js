/*----------------------------------------/
/     Skript für mobiles Navbar-Menü      /
/     -> Verwendung im Wiki und Vergleich /
/----------------------------------------*/

// Wird ausgeführt sobald das Dokument fertig geladen ist
$( document ).ready(function() {
  // Wenn auf den Navbar-Button geklickt wird
  $(".navbar-burger").click(function() {

      // Wechselt den Status des Menüs und des Buttons
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

  });
});

GENERAL

[x] web service -- why it should be run on a blockchain? Motivate
[x] js in modules
[x] use localStorage to store entire chain
[x] use an API to fetch location data
[x] motivate choice of API
[x] preset users in JSON format


LOGGED IN STATE

[x] welcome message + logout button
[x] user should be able to see own geolocation data (their own saved approximate locations, say Hello ${loggedInUser}, you have logged in from the following locations [Luleå, Stockholm, La Paz]-- Don't recognize a login? Contact customer service. -- if it is now something we want to log/display at all)
[x] user can add new blocks
[x] user can see/sort their own blocks -- add sorting function?
[x] exact coordinates (latitude/longitude) could be saved in each user generated block


PUBLIC USER

[x] without login, SOME content of chain shall be available 
[x] validation function available
[x] login option


MISC 

[ ] clean up code
[ ] publish on Github
[ ] disturb chain function? HACKING DA CHAINNN?


////////////////////////////////////////////////////////////////////////////////

Inlämningsuppgift
Som en gruppuppgift så får ni i uppdrag att bygga en webbtjänst som bygger på en blockkedja.

Ni får själva utveckla ett koncept och presentera varför denna tjänst skall utvecklas ovanför denna teknik.

Sista veckan så skall gruppen presentera vad ni har åstakommit och både visa konceptet ni har utvecklat samt prototypen ni har skrivit. 

G krav:

Tjänsten skall bygga på en blockkedja med en tydlig klasstruktur enligt blockchain modellen.
Blocken i kedjan skall vara hashade/krypterade.
Tjänsten skall även ha en inloggningsfunktion där användare skall kunna spara och lägga till saker i kedjan. Samt se sina block i kedjan. Ni skall använda LocalStorage som databas för kedjan.
Eran kedja skall ha en öppen valideringsfunktion som användare skall kunna köra för att validera kedjan.
Kedjan skall ha en “publik” del där även utomstående skall kunna se innehållet i kedjan.
Tjänsten skall vara lanserad på tex github pages.
VG krav:

Ett externt API skall användas för att hämta data till tjänsten. Dokumentera och visa på presentationen vilket/vilka API’er ni har valt att använda och varför.
Förutom dessa krav ovan får ni gärna själva lägga till fler funktioner!
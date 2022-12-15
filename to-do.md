GENERAL

[ ] web service -- why it should be run on a blockchain? Motivate
[ ] js in modules
[ ] use localStorage to store entire chain
[x] use an API to fetch location data
[ ] motivate choice of API
[ ] preset users in JSON like janne/test
[ ] 


LOGGED IN STATE

[ ] welcome message + logout button
[ ] user should be able to see own geolocation data (their own saved approximate locations, say Hello ${loggedInUser}, you have logged in from the following locations [Luleå, Stockholm, La Paz]-- Don't recognize a login? Contact customer service. -- if it is now something we want to log/display at all)
[ ] user can add new blocks
[ ] user can see/sort their own blocks -- add sorting function?
[ ] exact coordinates (latitude/longitude) could be saved in each user generated block
[ ] display random Chuck Norris quote just for the sake of fun? (Caroline's)
[ ] 

PUBLIC USER

[ ] without login, content of chain shall be available 
[ ] validation function available
[ ] login option
[ ] keep from login page task: ability to create new user
[ ] 
[ ] 


MISC 

[ ] add password strength checker upon new user registration
[ ] clean up code
[ ] publish on Github
[ ]


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

Förutom presentationen så skall ni lämna in ett gruppkontrakt under gruppuppgiftens första vecka, samt en code review på en annan grupps kod under sista veckan.
const weights = { L: 0.22, P: 0.2, PO: 0.16, V: 0.14, G: 0.1, W: 0.1, A: 0.08 };

const categories = [
  ["L", "Longevity", "22%", ["Total minutes played", "Seasons at All-NBA level", "Durability", "Career length at high impact"]],
  ["P", "Peak", "20%", ["Best 3-7 year stretch", "BPM, EPM, RAPTOR, WS/48 style indicators", "Peak scoring plus efficiency", "Peak defensive impact"]],
  ["PO", "Playoffs", "16%", ["Playoff impact metrics", "Finals performance", "Deep runs plus path difficulty", "Postseason scalability"]],
  ["V", "Versatility", "14%", ["Multi-position value", "On-ball plus off-ball ability", "Defensive switchability", "Fit in multiple systems"]],
  ["G", "Gravity", "10%", ["Shooting gravity", "Double-team pressure", "Spacing impact", "Defensive attention drawn"]],
  ["W", "Two-way Impact", "10%", ["Combined offense and defense", "On/off impact", "Two-way impact metrics", "Ability to anchor a unit"]],
  ["A", "Accolades", "8%", ["MVPs and Finals MVPs", "All-NBA and All-Defense", "Championships weighted lightly", "DPOY, scoring titles, major awards"]],
];
const metricKeys = ["L", "P", "PO", "V", "G", "W", "A"];

const providedRankings = [
  { rank: 1, player: "LeBron James", L: 10, P: 9.5, PO: 9.5, V: 10, G: 9, W: 9.5, A: 9 },
  { rank: 2, player: "Michael Jordan", L: 9, P: 10, PO: 10, V: 8.5, G: 8.5, W: 9, A: 10 },
  { rank: 3, player: "Kareem Abdul-Jabbar", L: 10, P: 9, PO: 8.5, V: 8, G: 7.5, W: 9, A: 10 },
  { rank: 4, player: "Stephen Curry", L: 8, P: 9, PO: 9, V: 8.5, G: 10, W: 7.5, A: 8.5 },
  { rank: 5, player: "Shaquille O'Neal", L: 8, P: 9.5, PO: 9, V: 7.5, G: 8, W: 8.5, A: 8.5 },
  { rank: 6, player: "Bill Russell", L: 9.5, P: 8.5, PO: 9.5, V: 7.5, G: 5.5, W: 10, A: 10 },
  { rank: 7, player: "Tim Duncan", L: 9, P: 8.5, PO: 9, V: 8, G: 6.5, W: 9.5, A: 9 },
  { rank: 8, player: "Magic Johnson", L: 8, P: 9, PO: 9, V: 8.5, G: 8.5, W: 7.5, A: 9 },
  { rank: 9, player: "Wilt Chamberlain", L: 9, P: 9, PO: 7.5, V: 7, G: 7, W: 8, A: 8.5 },
  { rank: 10, player: "Kevin Durant", L: 8.5, P: 8.5, PO: 8.5, V: 8.5, G: 8.5, W: 7.5, A: 8 },
  { rank: 11, player: "Hakeem Olajuwon", L: 8, P: 8.5, PO: 9, V: 8, G: 6.5, W: 9, A: 8 },
  { rank: 12, player: "Kobe Bryant", L: 8.5, P: 8.5, PO: 8.5, V: 8, G: 7.5, W: 8, A: 9 },
  { rank: 13, player: "Larry Bird", L: 7.5, P: 9, PO: 8.5, V: 7.5, G: 8, W: 7.5, A: 8.5 },
  { rank: 14, player: "Nikola Jokic", L: 7, P: 9, PO: 8.5, V: 9, G: 8.5, W: 8, A: 7 },
  { rank: 15, player: "Oscar Robertson", L: 8, P: 8.5, PO: 7.5, V: 8, G: 7, W: 7.5, A: 8 },
  { rank: 16, player: "Jerry West", L: 8, P: 8.5, PO: 8.5, V: 7.5, G: 7, W: 8, A: 8.5 },
  { rank: 17, player: "Giannis Antetokounmpo", L: 7.5, P: 8.5, PO: 8.5, V: 8.5, G: 7.5, W: 9, A: 7.5 },
  { rank: 18, player: "Dirk Nowitzki", L: 8.5, P: 8, PO: 8, V: 7.5, G: 8, W: 7, A: 8 },
  { rank: 19, player: "Moses Malone", L: 8.5, P: 8, PO: 7.5, V: 7, G: 6.5, W: 7.5, A: 8 },
  { rank: 20, player: "Dwyane Wade", L: 7.5, P: 8, PO: 8.5, V: 7.5, G: 7, W: 8, A: 7.5 },
  { rank: 21, player: "Kevin Garnett", L: 8.5, P: 8, PO: 7.5, V: 8.5, G: 6.5, W: 9, A: 7.5 },
  { rank: 22, player: "Chris Paul", L: 8, P: 8, PO: 7.5, V: 8.5, G: 7.5, W: 8, A: 7 },
  { rank: 23, player: "Kawhi Leonard", L: 6.5, P: 8.5, PO: 9, V: 8, G: 7.5, W: 9, A: 7 },
  { rank: 24, player: "David Robinson", L: 7.5, P: 8.5, PO: 7.5, V: 8, G: 6.5, W: 8.5, A: 7.5 },
  { rank: 25, player: "Karl Malone", L: 9, P: 8, PO: 7, V: 7.5, G: 6.5, W: 7, A: 7.5 },
  { rank: 26, player: "Charles Barkley", L: 8, P: 8.5, PO: 7.5, V: 7.5, G: 7.5, W: 6.5, A: 7.5 },
  { rank: 27, player: "Scottie Pippen", L: 7.5, P: 7.5, PO: 8, V: 8, G: 6.5, W: 8.5, A: 7.5 },
  { rank: 28, player: "John Stockton", L: 9, P: 7.5, PO: 7, V: 8, G: 7, W: 7.5, A: 7.5 },
  { rank: 29, player: "Elgin Baylor", L: 7.5, P: 8, PO: 7.5, V: 7.5, G: 7, W: 7, A: 7.5 },
  { rank: 30, player: "Rick Barry", L: 7.5, P: 8, PO: 7.5, V: 7.5, G: 7.5, W: 7, A: 7.5 },
  { rank: 31, player: "Allen Iverson", L: 7, P: 8, PO: 7.5, V: 7.5, G: 8, W: 6, A: 7 },
  { rank: 32, player: "James Harden", L: 8, P: 8.5, PO: 7.5, V: 8, G: 9, W: 6.5, A: 7.5 },
  { rank: 33, player: "Steve Nash", L: 7.5, P: 8, PO: 7.5, V: 8, G: 8.5, W: 6, A: 7.5 },
  { rank: 34, player: "Jason Kidd", L: 8.5, P: 7.5, PO: 7.5, V: 8, G: 6.5, W: 8, A: 7 },
  { rank: 35, player: "Isiah Thomas", L: 7.5, P: 7.5, PO: 8, V: 7.5, G: 6.5, W: 7.5, A: 7.5 },
  { rank: 36, player: "Patrick Ewing", L: 8, P: 7.5, PO: 7, V: 7, G: 5.5, W: 7.5, A: 7 },
  { rank: 37, player: "Clyde Drexler", L: 7.5, P: 7.5, PO: 7.5, V: 7.5, G: 7, W: 7, A: 7 },
  { rank: 38, player: "George Gervin", L: 7.5, P: 8, PO: 7, V: 7, G: 7.5, W: 6.5, A: 7 },
  { rank: 39, player: "Bob Pettit", L: 7.5, P: 8, PO: 7.5, V: 7, G: 6.5, W: 7, A: 7.5 },
  { rank: 40, player: "Bob Cousy", L: 7.5, P: 7.5, PO: 7.5, V: 7, G: 6.5, W: 6.5, A: 7.5 },
  { rank: 41, player: "John Havlicek", L: 8.5, P: 7.5, PO: 7.5, V: 7.5, G: 6.5, W: 7.5, A: 7.5 },
  { rank: 42, player: "Kevin McHale", L: 7.5, P: 7.5, PO: 7.5, V: 7, G: 6, W: 7.5, A: 7.5 },
  { rank: 43, player: "Reggie Miller", L: 8, P: 7, PO: 7.5, V: 7, G: 8, W: 6.5, A: 7 },
  { rank: 44, player: "Russell Westbrook", L: 8, P: 8, PO: 7.5, V: 7.5, G: 7.5, W: 6.5, A: 7 },
  { rank: 45, player: "Damian Lillard", L: 7.5, P: 8, PO: 7.5, V: 7.5, G: 8.5, W: 6.5, A: 6.5 },
  { rank: 46, player: "Walt Frazier", L: 7.5, P: 7.5, PO: 7.5, V: 7.5, G: 6, W: 8, A: 7.5 },
  { rank: 47, player: "Paul Pierce", L: 8, P: 7.5, PO: 7.5, V: 7.5, G: 7, W: 7, A: 7.5 },
  { rank: 48, player: "Manu Ginobili", L: 7, P: 7.5, PO: 7.5, V: 8, G: 7, W: 7.5, A: 7 },
  { rank: 49, player: "Anthony Davis", L: 6.5, P: 8, PO: 7.5, V: 8, G: 6.5, W: 8.5, A: 6.5 },
  { rank: 50, player: "Dominique Wilkins", L: 7.5, P: 7.5, PO: 7, V: 7, G: 7.5, W: 6.5, A: 7 },
  { rank: 51, player: "Tracy McGrady", L: 6.5, P: 8, PO: 7, V: 7.5, G: 7.5, W: 6.5, A: 6 },
  { rank: 52, player: "Vince Carter", L: 8, P: 7, PO: 6.5, V: 7, G: 7, W: 6, A: 6 },
  { rank: 53, player: "Pau Gasol", L: 8, P: 7.5, PO: 7.5, V: 7.5, G: 6, W: 7.5, A: 7 },
  { rank: 54, player: "Alonzo Mourning", L: 7, P: 7.5, PO: 7, V: 7, G: 5.5, W: 8, A: 6.5 },
  { rank: 55, player: "Dwight Howard", L: 8, P: 8, PO: 7.5, V: 7.5, G: 6, W: 8.5, A: 6.5 },
  { rank: 56, player: "Ben Wallace", L: 7, P: 7, PO: 7, V: 6.5, G: 4.5, W: 9.5, A: 7 },
  { rank: 57, player: "Dikembe Mutombo", L: 8, P: 7, PO: 7, V: 6.5, G: 4.5, W: 9, A: 7 },
  { rank: 58, player: "Carmelo Anthony", L: 8, P: 7.5, PO: 6.5, V: 7, G: 8, W: 5.5, A: 6.5 },
  { rank: 59, player: "Klay Thompson", L: 7.5, P: 7, PO: 7.5, V: 7, G: 8.5, W: 6.5, A: 7 },
  { rank: 60, player: "Draymond Green", L: 7, P: 7.5, PO: 8, V: 8.5, G: 5.5, W: 9, A: 7 },
  { rank: 61, player: "Tony Parker", L: 8, P: 7, PO: 7.5, V: 7, G: 6, W: 6.5, A: 7.5 },
  { rank: 62, player: "Robert Parish", L: 9, P: 7, PO: 6.5, V: 6.5, G: 5, W: 7, A: 7 },
  { rank: 63, player: "Alex English", L: 8, P: 7.5, PO: 6.5, V: 6.5, G: 7, W: 5.5, A: 6.5 },
  { rank: 64, player: "Grant Hill", L: 5, P: 8, PO: 7, V: 8, G: 6.5, W: 7, A: 6 },
  { rank: 65, player: "Chris Webber", L: 7, P: 7.5, PO: 6.5, V: 7.5, G: 6.5, W: 6.5, A: 6.5 },
  { rank: 66, player: "Yao Ming", L: 5.5, P: 8, PO: 7, V: 7, G: 6, W: 7, A: 6 },
  { rank: 67, player: "Joe Dumars", L: 7.5, P: 7, PO: 7.5, V: 7, G: 6, W: 7.5, A: 7 },
  { rank: 68, player: "Dennis Rodman", L: 6.5, P: 7, PO: 7, V: 7, G: 3, W: 10, A: 7 },
  { rank: 69, player: "Bernard King", L: 6, P: 8, PO: 6.5, V: 7, G: 7.5, W: 6, A: 6 },
  { rank: 70, player: "Sidney Moncrief", L: 7, P: 7.5, PO: 7, V: 7, G: 5.5, W: 8.5, A: 6.5 },
  { rank: 71, player: "Lenny Wilkens", L: 8, P: 7, PO: 6.5, V: 7, G: 5.5, W: 6.5, A: 6.5 },
  { rank: 72, player: "Earl Monroe", L: 7.5, P: 7.5, PO: 8, V: 7.5, G: 6.5, W: 6.5, A: 7 },
  { rank: 73, player: "Nate Archibald", L: 6.5, P: 7.5, PO: 6.5, V: 7, G: 7, W: 6, A: 6.5 },
  { rank: 74, player: "Artis Gilmore", L: 8, P: 7.5, PO: 7, V: 6.5, G: 5, W: 7.5, A: 6.5 },
  { rank: 75, player: "Bill Walton", L: 4, P: 9, PO: 8, V: 8, G: 6, W: 8.5, A: 6.5 },
  { rank: 76, player: "Kyrie Irving", L: 6.5, P: 8, PO: 7, V: 7, G: 8.5, W: 5.5, A: 6 },
  { rank: 77, player: "Dwight Howard", L: 8, P: 8, PO: 7.5, V: 7.5, G: 6, W: 8.5, A: 6.5 },
  { rank: 78, player: "Amare Stoudemire", L: 7, P: 8, PO: 7, V: 7, G: 7, W: 5.5, A: 5.5 },
  { rank: 79, player: "Shawn Kemp", L: 7, P: 7.5, PO: 7, V: 7, G: 6.5, W: 6, A: 5.5 },
  { rank: 80, player: "Blake Griffin", L: 7, P: 7.5, PO: 6.5, V: 7.5, G: 7, W: 5.5, A: 5.5 },
  { rank: 81, player: "LaMarcus Aldridge", L: 8, P: 7, PO: 6.5, V: 7, G: 6.5, W: 6, A: 6 },
  { rank: 82, player: "Chris Bosh", L: 7.5, P: 7.5, PO: 7.5, V: 7.5, G: 6.5, W: 7, A: 6.5 },
  { rank: 83, player: "Rasheed Wallace", L: 7.5, P: 7, PO: 7, V: 7.5, G: 6, W: 7, A: 6 },
  { rank: 84, player: "Brad Daugherty", L: 6, P: 7.5, PO: 6.5, V: 7, G: 6, W: 6.5, A: 5.5 },
  { rank: 85, player: "Terry Cummings", L: 8, P: 7, PO: 6.5, V: 6.5, G: 6, W: 6, A: 6 },
  { rank: 86, player: "Joe Johnson", L: 8, P: 7, PO: 6.5, V: 7, G: 7, W: 5.5, A: 6 },
  { rank: 87, player: "Horace Grant", L: 8, P: 6.5, PO: 7, V: 7, G: 5.5, W: 7, A: 6 },
  { rank: 88, player: "Kevin Love", L: 7, P: 7.5, PO: 7, V: 7, G: 7.5, W: 5.5, A: 6 },
  { rank: 89, player: "Marc Gasol", L: 7.5, P: 7, PO: 7, V: 7.5, G: 5.5, W: 8, A: 6 },
  { rank: 90, player: "Jrue Holiday", L: 7, P: 7, PO: 7, V: 8, G: 6, W: 8, A: 5.5 },
  { rank: 91, player: "Joakim Noah", L: 6.5, P: 7, PO: 7, V: 7.5, G: 5, W: 8, A: 5.5 },
  { rank: 92, player: "DeMar DeRozan", L: 8, P: 7, PO: 6.5, V: 7, G: 7.5, W: 5, A: 5.5 },
  { rank: 93, player: "Kyle Lowry", L: 7.5, P: 7, PO: 7.5, V: 7.5, G: 6, W: 7, A: 6 },
  { rank: 94, player: "Al Horford", L: 8, P: 6.5, PO: 7, V: 7.5, G: 5.5, W: 7.5, A: 5.5 },
  { rank: 95, player: "Shawn Marion", L: 8, P: 7, PO: 7, V: 8, G: 5.5, W: 8, A: 5.5 },
  { rank: 96, player: "Peja Stojakovic", L: 7, P: 7, PO: 6.5, V: 6.5, G: 8.5, W: 5, A: 5.5 },
  { rank: 97, player: "Mitch Richmond", L: 7.5, P: 7.5, PO: 6.5, V: 7, G: 7, W: 5.5, A: 6 },
  { rank: 98, player: "Penny Hardaway", L: 5, P: 8, PO: 7.5, V: 8, G: 7, W: 6, A: 5.5 },
  { rank: 99, player: "Baron Davis", L: 6.5, P: 7, PO: 7, V: 7.5, G: 6, W: 6.5, A: 5.5 },
  { rank: 100, player: "Derrick Rose", L: 5, P: 8.5, PO: 6.5, V: 7, G: 7, W: 5, A: 5.5 },
];

const playerSeeds = [
  ["Michael Jordan", "1985-2003", "SG", "Bulls, Wizards", "scoring two-way closer", [9.1, 10, 10, 9.3, 8.8, 9.9, 10]],
  ["LeBron James", "2004-active", "SF/PF", "Cavaliers, Heat, Lakers", "heliocentric jumbo creator", [10, 9.8, 9.8, 10, 8.5, 9.4, 10]],
  ["Kareem Abdul-Jabbar", "1970-1989", "C", "Bucks, Lakers", "interior engine", [10, 9.7, 9.5, 8.7, 6.4, 9.4, 10]],
  ["Bill Russell", "1957-1969", "C", "Celtics", "defensive dynasty anchor", [8.9, 9.3, 10, 8.6, 4.8, 10, 9.8]],
  ["Magic Johnson", "1980-1996", "PG", "Lakers", "transition playmaking hub", [8.6, 9.7, 9.8, 9.6, 7.6, 8.1, 9.5]],
  ["Tim Duncan", "1998-2016", "PF/C", "Spurs", "low-post two-way anchor", [9.8, 9.1, 9.4, 9.2, 5.2, 9.8, 9.4]],
  ["Shaquille O'Neal", "1993-2011", "C", "Magic, Lakers, Heat", "paint-warping force", [8.8, 10, 9.5, 7.7, 6.6, 8.6, 9.1]],
  ["Larry Bird", "1980-1992", "SF/PF", "Celtics", "shooting forward genius", [8.2, 9.8, 9.2, 9.4, 9.4, 8.1, 9.2]],
  ["Wilt Chamberlain", "1960-1973", "C", "Warriors, 76ers, Lakers", "record-setting interior engine", [9.5, 9.9, 8.2, 8.1, 5.8, 9.0, 9.3]],
  ["Stephen Curry", "2010-active", "PG", "Warriors", "off-ball shooting gravity", [8.5, 9.8, 9.2, 8.7, 10, 7.3, 8.8]],
  ["Hakeem Olajuwon", "1985-2002", "C", "Rockets, Raptors", "elite two-way center", [9.2, 9.6, 9.3, 8.7, 5.9, 10, 8.7]],
  ["Kobe Bryant", "1997-2016", "SG", "Lakers", "shot-making two-way wing", [9.6, 9.3, 9.2, 8.8, 8.5, 8.9, 9.3]],
  ["Nikola Jokic", "2016-active", "C", "Nuggets", "passing center engine", [7.2, 9.9, 8.8, 9.6, 8.4, 7.8, 8.0]],
  ["Oscar Robertson", "1961-1974", "PG", "Royals, Bucks", "large guard creator", [9.0, 9.4, 8.2, 9.1, 7.0, 7.9, 8.8]],
  ["Kevin Durant", "2008-active", "SF/PF", "Thunder, Warriors, Nets, Suns", "scoring forward", [8.8, 9.6, 8.8, 8.8, 9.5, 8.1, 8.7]],
  ["Jerry West", "1961-1974", "PG/SG", "Lakers", "playoff shot creator", [8.6, 9.2, 9.4, 8.8, 7.6, 8.8, 8.7]],
  ["Kevin Garnett", "1996-2016", "PF/C", "Timberwolves, Celtics", "switchable defensive hub", [9.4, 9.2, 8.2, 9.6, 6.6, 9.9, 8.3]],
  ["Moses Malone", "1975-1995", "C", "Rockets, 76ers", "rebounding pressure center", [9.5, 9.0, 8.7, 7.4, 5.0, 8.4, 8.8]],
  ["Dirk Nowitzki", "1999-2019", "PF", "Mavericks", "spacing big scorer", [9.3, 9.1, 8.9, 8.0, 9.4, 6.8, 8.3]],
  ["Julius Erving", "1972-1987", "SF", "Squires, Nets, 76ers", "slashing wing icon", [8.8, 9.1, 8.7, 8.8, 7.0, 8.0, 8.8]],
  ["David Robinson", "1990-2003", "C", "Spurs", "athletic two-way center", [8.6, 9.4, 8.0, 8.4, 5.6, 9.8, 8.2]],
  ["Giannis Antetokounmpo", "2014-active", "PF", "Bucks", "rim pressure two-way forward", [7.7, 9.6, 8.6, 9.4, 6.8, 9.6, 8.2]],
  ["Karl Malone", "1986-2004", "PF", "Jazz, Lakers", "durable scoring forward", [9.8, 8.9, 7.9, 8.3, 6.4, 8.5, 8.7]],
  ["Charles Barkley", "1985-2000", "PF", "76ers, Suns, Rockets", "efficient power creator", [8.7, 9.3, 8.2, 8.8, 7.2, 7.1, 7.8]],
  ["Dwyane Wade", "2004-2019", "SG", "Heat, Bulls, Cavaliers", "slashing guard stopper", [8.2, 9.2, 9.0, 8.5, 7.0, 8.8, 8.2]],
  ["Elgin Baylor", "1959-1972", "SF", "Lakers", "explosive scoring forward", [8.3, 9.2, 8.3, 8.5, 6.5, 7.7, 8.0]],
  ["Bob Pettit", "1955-1965", "PF/C", "Hawks", "early-era scoring big", [8.0, 9.0, 8.6, 7.8, 5.8, 8.2, 8.4]],
  ["John Havlicek", "1963-1978", "SF/SG", "Celtics", "endurance two-way wing", [9.3, 8.3, 8.9, 9.2, 6.8, 9.0, 8.6]],
  ["Chris Paul", "2006-active", "PG", "Hornets, Clippers, Rockets, Suns", "floor general defender", [9.0, 9.0, 7.9, 9.0, 8.2, 8.7, 7.7]],
  ["Kawhi Leonard", "2012-active", "SF", "Spurs, Raptors, Clippers", "playoff two-way wing", [6.8, 9.5, 9.5, 9.1, 8.0, 9.8, 7.7]],
  ["Isiah Thomas", "1982-1994", "PG", "Pistons", "small guard playoff creator", [8.2, 8.8, 9.1, 8.5, 7.2, 7.8, 8.0]],
  ["Scottie Pippen", "1988-2004", "SF", "Bulls, Rockets, Trail Blazers", "elite defensive connector", [8.9, 8.5, 8.9, 9.7, 6.9, 9.5, 8.0]],
  ["Steve Nash", "1997-2015", "PG", "Suns, Mavericks, Lakers", "pick-and-roll efficiency engine", [8.5, 9.1, 7.7, 8.5, 9.3, 6.1, 7.7]],
  ["James Harden", "2010-active", "SG/PG", "Thunder, Rockets, Nets, 76ers, Clippers", "isolation scoring engine", [8.5, 9.3, 7.4, 8.3, 9.2, 6.6, 7.8]],
  ["Allen Iverson", "1997-2010", "PG/SG", "76ers, Nuggets, Pistons, Grizzlies", "high-usage scoring guard", [8.0, 8.9, 8.4, 7.7, 7.9, 6.8, 7.8]],
  ["John Stockton", "1985-2003", "PG", "Jazz", "durable pass-first guard", [9.7, 8.2, 7.8, 8.6, 8.0, 8.2, 7.7]],
  ["Rick Barry", "1966-1980", "SF", "Warriors, Nets, Rockets", "scoring forward playmaker", [8.3, 8.8, 8.5, 8.3, 7.4, 7.3, 7.8]],
  ["Elvin Hayes", "1969-1984", "PF/C", "Rockets, Bullets", "durable scoring big", [9.2, 8.2, 8.2, 7.8, 5.4, 8.3, 8.0]],
  ["George Mikan", "1949-1956", "C", "Lakers", "first dominant center", [6.9, 9.1, 8.9, 7.1, 4.5, 8.8, 8.4]],
  ["Jason Kidd", "1995-2013", "PG", "Mavericks, Suns, Nets, Knicks", "transition passing defender", [9.0, 8.3, 8.1, 9.2, 7.6, 8.8, 7.7]],
  ["Bob Cousy", "1951-1970", "PG", "Celtics, Royals", "early-era playmaking guard", [8.5, 8.3, 8.6, 8.4, 6.4, 7.4, 8.4]],
  ["Patrick Ewing", "1986-2002", "C", "Knicks, SuperSonics, Magic", "two-way scoring center", [8.8, 8.6, 7.8, 7.8, 5.2, 9.0, 7.6]],
  ["Clyde Drexler", "1984-1998", "SG/SF", "Trail Blazers, Rockets", "open-court wing star", [8.5, 8.5, 8.4, 8.6, 7.2, 7.8, 7.7]],
  ["Reggie Miller", "1988-2005", "SG", "Pacers", "movement shooting star", [8.8, 8.1, 8.5, 7.7, 9.6, 6.6, 7.1]],
  ["Gary Payton", "1991-2007", "PG", "SuperSonics, Lakers, Heat", "defensive point guard", [8.7, 8.4, 7.7, 8.6, 7.2, 9.0, 7.4]],
  ["Walt Frazier", "1968-1980", "PG", "Knicks, Cavaliers", "two-way championship guard", [8.0, 8.5, 8.8, 8.6, 6.8, 8.8, 7.7]],
  ["Bill Walton", "1975-1987", "C", "Trail Blazers, Clippers, Celtics", "passing defensive center", [5.6, 9.3, 8.8, 9.0, 5.3, 9.4, 7.0]],
  ["Russell Westbrook", "2009-active", "PG", "Thunder, Rockets, Wizards, Lakers, Clippers, Nuggets", "rim-pressure guard", [8.6, 8.8, 7.4, 8.6, 6.7, 7.4, 7.8]],
  ["Dominique Wilkins", "1983-1999", "SF", "Hawks, Clippers, Celtics, Spurs, Magic", "explosive scoring wing", [8.5, 8.6, 7.5, 7.6, 6.9, 7.0, 7.4]],
  ["Willis Reed", "1965-1974", "C", "Knicks", "physical championship center", [7.1, 8.7, 9.0, 7.6, 5.0, 8.7, 7.8]],
  ["Dolph Schayes", "1950-1964", "PF/C", "Nationals, 76ers", "durable early star big", [8.8, 8.1, 7.8, 7.5, 5.8, 7.8, 7.9]],
  ["Paul Pierce", "1999-2017", "SF", "Celtics, Nets, Wizards, Clippers", "shot-making wing scorer", [8.8, 8.1, 8.2, 8.1, 7.9, 7.2, 7.2]],
  ["Anthony Davis", "2013-active", "PF/C", "Pelicans, Lakers", "mobile defensive big", [7.2, 9.1, 8.3, 8.8, 6.8, 9.7, 7.0]],
  ["Kevin McHale", "1981-1993", "PF", "Celtics", "post scorer defender", [7.8, 8.6, 8.7, 8.0, 5.8, 8.7, 7.6]],
  ["Ray Allen", "1997-2014", "SG", "Bucks, SuperSonics, Celtics, Heat", "elite shooting guard", [8.6, 8.0, 8.2, 7.8, 9.5, 6.8, 7.2]],
  ["George Gervin", "1973-1986", "SG/SF", "Spurs, Bulls", "smooth scoring wing", [8.1, 8.7, 7.4, 7.5, 7.4, 6.7, 7.5]],
  ["Bob McAdoo", "1973-1986", "C/PF", "Braves, Knicks, Celtics, Lakers", "shooting scoring big", [7.7, 8.8, 7.6, 7.4, 7.3, 7.2, 7.4]],
  ["Tony Parker", "2002-2019", "PG", "Spurs, Hornets", "paint-touch guard", [8.5, 8.0, 8.8, 7.7, 6.8, 6.6, 7.6]],
  ["Manu Ginobili", "2003-2018", "SG", "Spurs", "creative two-way guard", [7.8, 8.3, 8.8, 8.7, 8.0, 8.0, 7.3]],
  ["Pau Gasol", "2002-2019", "PF/C", "Grizzlies, Lakers, Bulls, Spurs", "skilled passing big", [8.5, 8.0, 8.4, 8.3, 6.4, 7.8, 7.2]],
  ["Robert Parish", "1977-1997", "C", "Warriors, Celtics, Hornets, Bulls", "durable championship center", [9.1, 7.6, 8.2, 7.5, 4.9, 8.1, 7.5]],
  ["Nate Thurmond", "1964-1977", "C", "Warriors, Bulls, Cavaliers", "elite defensive center", [8.2, 8.2, 7.5, 7.6, 4.7, 9.0, 7.0]],
  ["Dwight Howard", "2005-2022", "C", "Magic, Lakers, Rockets, Hawks, Hornets, Wizards, 76ers", "rim-running defensive anchor", [8.1, 8.8, 7.4, 7.4, 4.8, 9.6, 7.3]],
  ["Dennis Rodman", "1987-2000", "PF", "Pistons, Spurs, Bulls, Lakers, Mavericks", "rebounding defensive specialist", [7.6, 8.0, 8.7, 8.4, 4.4, 9.5, 7.3]],
  ["Draymond Green", "2013-active", "PF/C", "Warriors", "switchable defensive passer", [7.0, 8.2, 8.8, 9.2, 6.4, 9.4, 6.8]],
  ["Damian Lillard", "2013-active", "PG", "Trail Blazers, Bucks", "deep-range scoring guard", [7.8, 8.7, 7.5, 7.8, 9.4, 6.2, 6.9]],
  ["Tracy McGrady", "1998-2013", "SG/SF", "Raptors, Magic, Rockets, Spurs", "big wing shot creator", [7.1, 9.0, 6.8, 8.4, 8.2, 7.2, 6.7]],
  ["Vince Carter", "1999-2020", "SG/SF", "Raptors, Nets, Magic, Mavericks, Hawks", "long-career scoring wing", [8.9, 8.1, 6.9, 7.8, 8.1, 6.7, 6.5]],
  ["Carmelo Anthony", "2004-2022", "SF/PF", "Nuggets, Knicks, Thunder, Rockets, Trail Blazers, Lakers", "isolation scoring forward", [8.5, 8.4, 7.0, 7.4, 8.2, 6.3, 7.0]],
  ["Chris Bosh", "2004-2016", "PF/C", "Raptors, Heat", "spacing big connector", [7.2, 8.1, 8.1, 8.3, 7.6, 7.5, 6.9]],
  ["Kyrie Irving", "2012-active", "PG", "Cavaliers, Celtics, Nets, Mavericks", "handle shot-maker", [7.2, 8.7, 8.0, 7.7, 8.9, 5.9, 6.8]],
  ["Joel Embiid", "2017-active", "C", "76ers", "scoring defensive center", [6.4, 9.4, 7.0, 8.0, 7.6, 9.0, 7.0]],
  ["Luka Doncic", "2019-active", "PG/SF", "Mavericks", "jumbo heliocentric creator", [6.2, 9.3, 7.9, 8.8, 8.6, 6.7, 6.6]],
  ["Sam Jones", "1958-1969", "SG", "Celtics", "clutch dynasty scorer", [7.9, 7.8, 8.8, 7.4, 5.9, 7.2, 7.6]],
  ["Dave Cowens", "1971-1983", "C", "Celtics, Bucks", "mobile high-motor center", [7.5, 8.2, 8.2, 8.0, 5.1, 8.5, 7.3]],
  ["Wes Unseld", "1969-1981", "C", "Bullets", "outlet-passing defensive center", [7.9, 7.7, 8.2, 7.9, 4.7, 8.5, 7.4]],
  ["Dave DeBusschere", "1963-1974", "PF", "Pistons, Knicks", "defensive forward", [7.7, 7.7, 8.4, 8.2, 5.6, 8.6, 7.3]],
  ["James Worthy", "1983-1994", "SF", "Lakers", "transition playoff scorer", [7.5, 7.9, 8.9, 7.8, 6.3, 7.4, 7.3]],
  ["Hal Greer", "1959-1973", "SG", "Nationals, 76ers", "durable scoring guard", [8.4, 7.7, 7.8, 7.5, 6.4, 7.0, 7.2]],
  ["Alex English", "1977-1991", "SF", "Nuggets, Bucks, Pacers, Mavericks", "efficient scoring forward", [8.3, 8.2, 6.7, 7.5, 6.8, 6.6, 7.0]],
  ["Adrian Dantley", "1977-1991", "SF", "Braves, Pacers, Lakers, Jazz, Pistons, Mavericks, Bucks", "efficient isolation scorer", [8.0, 8.4, 6.8, 7.2, 6.8, 6.3, 7.0]],
  ["Pete Maravich", "1971-1980", "PG/SG", "Hawks, Jazz, Celtics", "creative scoring guard", [6.6, 8.7, 6.6, 8.2, 7.6, 6.0, 6.8]],
  ["Bernard King", "1978-1993", "SF", "Nets, Jazz, Warriors, Knicks, Bullets", "peak scoring wing", [6.8, 8.8, 7.0, 7.4, 6.9, 6.4, 6.8]],
  ["Bob Lanier", "1971-1984", "C", "Pistons, Bucks", "skilled scoring center", [8.0, 8.1, 6.9, 7.5, 5.4, 7.7, 6.9]],
  ["Alonzo Mourning", "1993-2008", "C", "Hornets, Heat, Nets", "shot-blocking center", [7.4, 8.3, 7.4, 7.3, 4.8, 9.1, 7.0]],
  ["Dikembe Mutombo", "1992-2009", "C", "Nuggets, Hawks, 76ers, Nets, Knicks, Rockets", "rim-protecting specialist", [8.2, 7.8, 7.2, 7.2, 4.2, 9.5, 7.1]],
  ["Yao Ming", "2003-2011", "C", "Rockets", "skilled giant center", [5.8, 8.5, 7.1, 7.3, 6.0, 8.0, 6.7]],
  ["Grant Hill", "1995-2013", "SF", "Pistons, Magic, Suns, Clippers", "point forward", [7.1, 8.5, 6.7, 8.7, 6.9, 7.3, 6.7]],
  ["Penny Hardaway", "1994-2008", "PG/SG", "Magic, Suns, Knicks, Heat", "big guard creator", [5.8, 8.7, 7.5, 8.4, 7.0, 6.8, 6.5]],
  ["Klay Thompson", "2012-active", "SG", "Warriors, Mavericks", "movement shooter defender", [7.3, 8.0, 8.5, 7.7, 9.5, 7.7, 6.8]],
  ["Paul George", "2011-active", "SF", "Pacers, Thunder, Clippers, 76ers", "two-way scoring wing", [7.5, 8.3, 7.2, 8.5, 8.1, 8.3, 6.7]],
  ["Jimmy Butler", "2012-active", "SF", "Bulls, Timberwolves, 76ers, Heat, Warriors", "playoff two-way wing", [7.2, 8.4, 8.6, 8.6, 6.8, 8.5, 6.5]],
  ["Jayson Tatum", "2018-active", "SF/PF", "Celtics", "modern two-way scoring forward", [6.7, 8.7, 8.1, 8.7, 8.0, 8.2, 6.7]],
  ["Chauncey Billups", "1998-2014", "PG", "Pistons, Nuggets, Clippers", "efficient floor general", [7.5, 7.9, 8.4, 7.9, 7.8, 7.5, 6.9]],
  ["Joe Dumars", "1986-1999", "SG", "Pistons", "two-way guard", [7.8, 7.7, 8.3, 7.8, 6.9, 8.2, 6.9]],
  ["Sidney Moncrief", "1980-1991", "SG", "Bucks, Hawks", "elite defensive guard", [7.0, 8.2, 7.4, 8.1, 6.3, 9.2, 6.8]],
  ["Tiny Archibald", "1971-1984", "PG", "Royals, Kings, Nets, Celtics, Bucks", "speed scoring passer", [7.6, 8.1, 7.4, 7.7, 6.8, 6.6, 7.0]],
  ["Earl Monroe", "1968-1980", "SG", "Bullets, Knicks", "creative scoring guard", [7.4, 7.8, 8.1, 7.5, 6.6, 6.8, 7.0]],
  ["Jerry Lucas", "1964-1974", "PF/C", "Royals, Warriors, Knicks", "shooting rebounding big", [7.6, 8.0, 7.8, 7.5, 6.3, 7.2, 7.1]],
  ["Artis Gilmore", "1972-1988", "C", "Colonels, Bulls, Spurs, Celtics", "efficient defensive center", [8.4, 7.8, 7.0, 7.3, 4.6, 8.5, 6.9]],
  ["Spencer Haywood", "1970-1983", "PF/C", "Nuggets, SuperSonics, Knicks, Lakers, Bullets", "scoring rebounding forward", [7.4, 8.1, 7.0, 7.4, 5.5, 7.5, 6.9]],
  ["Neil Johnston", "1952-1959", "C", "Warriors", "short-prime scoring center", [5.9, 8.4, 7.5, 6.9, 4.5, 7.8, 7.2]],
  ["Tom Heinsohn", "1957-1965", "PF", "Celtics", "dynasty scoring forward", [6.9, 7.6, 8.5, 7.1, 5.3, 7.0, 7.2]],
  ["Billy Cunningham", "1966-1976", "SF/PF", "76ers, Cougars", "athletic scoring forward", [7.1, 8.0, 7.5, 7.8, 5.8, 7.4, 7.0]],
  ["Nate McMillan", "1987-1998", "PG/SG", "SuperSonics", "defensive connector", [6.8, 7.0, 7.3, 8.0, 5.7, 8.4, 5.8]],
  ["Mitch Richmond", "1989-2002", "SG", "Warriors, Kings, Wizards, Lakers", "strong scoring guard", [7.7, 8.0, 6.8, 7.2, 7.5, 6.7, 6.6]],
  ["Shawn Kemp", "1990-2003", "PF", "SuperSonics, Cavaliers, Trail Blazers, Magic", "explosive power forward", [6.8, 8.1, 7.6, 7.6, 5.4, 7.8, 6.5]],
  ["Chris Webber", "1994-2008", "PF/C", "Warriors, Bullets, Kings, 76ers, Pistons", "passing big scorer", [7.4, 8.4, 6.8, 8.2, 6.2, 7.1, 6.5]],
  ["Blake Griffin", "2011-2022", "PF", "Clippers, Pistons, Nets, Celtics", "playmaking power athlete", [7.1, 8.2, 6.7, 8.0, 6.7, 6.6, 6.3]],
  ["Amar'e Stoudemire", "2003-2016", "PF/C", "Suns, Knicks, Mavericks, Heat", "roll-man scoring big", [7.0, 8.3, 7.1, 7.2, 5.8, 6.8, 6.4]],
  ["LaMarcus Aldridge", "2007-2022", "PF/C", "Trail Blazers, Spurs, Nets", "mid-post scoring big", [8.0, 7.8, 6.5, 7.2, 6.3, 6.9, 6.5]],
  ["Marc Gasol", "2009-2021", "C", "Grizzlies, Raptors, Lakers", "passing defensive center", [7.3, 7.8, 8.0, 8.2, 6.2, 8.8, 6.5]],
  ["Ben Wallace", "1997-2012", "C", "Pistons, Bulls, Cavaliers, Magic", "defensive specialist center", [7.3, 7.4, 8.1, 7.3, 3.8, 9.8, 6.8]],
  ["Rudy Gobert", "2014-active", "C", "Jazz, Timberwolves", "regular-season rim protector", [7.2, 7.8, 6.8, 7.0, 4.0, 9.5, 6.9]],
  ["Tony Allen", "2005-2018", "SG", "Celtics, Grizzlies, Pelicans", "perimeter defensive specialist", [6.7, 6.9, 7.5, 7.4, 4.4, 8.8, 5.8]],
  ["Jamal Murray", "2017-active", "PG", "Nuggets", "playoff shot-maker", [5.8, 8.0, 8.6, 7.3, 8.2, 5.8, 5.8]],
  ["Devin Booker", "2016-active", "SG", "Suns", "three-level scoring guard", [6.7, 8.3, 7.5, 7.4, 8.5, 6.1, 6.0]],
  ["Shai Gilgeous-Alexander", "2019-active", "SG/PG", "Clippers, Thunder", "driving scoring guard", [5.9, 9.0, 6.8, 8.0, 7.6, 7.2, 6.2]],
  ["Ja Morant", "2020-active", "PG", "Grizzlies", "rim-pressure creator", [5.4, 8.3, 6.7, 7.5, 6.8, 5.9, 5.6]],
  ["Trae Young", "2019-active", "PG", "Hawks", "deep-range passing guard", [6.1, 8.2, 7.1, 7.3, 9.0, 4.8, 5.8]],
  ["Zion Williamson", "2020-active", "PF", "Pelicans", "paint-pressure forward", [4.7, 8.5, 6.1, 7.2, 5.8, 6.4, 5.3]],
  ["LaMelo Ball", "2021-active", "PG", "Hornets", "creative passing guard", [4.8, 7.5, 5.6, 7.4, 7.8, 5.3, 4.8]],
  ["Chris Mullin", "1986-2001", "SF", "Warriors, Pacers", "efficient scoring wing", [7.5, 7.8, 6.8, 7.4, 8.1, 6.4, 6.5]],
  ["Tim Hardaway", "1990-2003", "PG", "Warriors, Heat, Mavericks, Nuggets, Pacers", "crossover scoring passer", [7.5, 7.8, 6.9, 7.7, 7.8, 6.4, 6.4]],
  ["Mark Price", "1987-1998", "PG", "Cavaliers, Bullets, Warriors, Magic", "shooting floor general", [6.7, 8.0, 7.0, 7.5, 8.8, 6.0, 6.1]],
  ["Kevin Johnson", "1988-2000", "PG", "Cavaliers, Suns", "paint-touch playmaker", [6.9, 8.0, 7.3, 7.8, 6.9, 6.2, 6.1]],
  ["Dennis Johnson", "1977-1990", "PG/SG", "SuperSonics, Suns, Celtics", "defensive playoff guard", [7.8, 7.3, 8.4, 7.8, 5.8, 8.7, 6.8]],
  ["Maurice Cheeks", "1979-1993", "PG", "76ers, Spurs, Knicks, Hawks, Nets", "steady defensive point guard", [7.8, 7.2, 8.0, 7.8, 5.8, 8.2, 6.4]],
  ["Gail Goodrich", "1966-1979", "SG", "Lakers, Suns, Jazz", "scoring guard", [7.6, 7.7, 7.6, 7.2, 6.6, 6.3, 6.5]],
  ["Lou Hudson", "1967-1979", "SG/SF", "Hawks, Lakers", "smooth scoring wing", [7.5, 7.8, 6.6, 7.2, 6.4, 6.4, 6.3]],
  ["Connie Hawkins", "1962-1976", "PF/SF", "Pipers, Suns, Lakers, Hawks", "athletic forward creator", [6.2, 8.1, 7.2, 7.9, 5.8, 7.2, 6.5]],
  ["George McGinnis", "1972-1982", "PF", "Pacers, 76ers, Nuggets", "power scoring forward", [6.9, 8.0, 7.4, 7.7, 5.7, 7.1, 6.6]],
  ["Dan Issel", "1971-1985", "C/PF", "Colonels, Nuggets", "durable scoring big", [8.1, 7.6, 6.8, 7.1, 5.5, 6.8, 6.5]],
  ["Jack Sikma", "1978-1991", "C", "SuperSonics, Bucks", "shooting defensive center", [7.8, 7.5, 7.5, 7.4, 6.0, 8.0, 6.5]],
  ["Jo Jo White", "1970-1981", "PG", "Celtics, Warriors, Kings", "championship scoring guard", [7.3, 7.4, 8.1, 7.3, 6.2, 6.7, 6.5]],
  ["Bob Dandridge", "1970-1982", "SF", "Bucks, Bullets", "two-way championship wing", [7.4, 7.4, 8.0, 7.8, 5.9, 7.7, 6.4]],
  ["Gus Williams", "1976-1987", "PG", "Warriors, SuperSonics, Bullets, Hawks", "quick playoff guard", [6.8, 7.7, 7.8, 7.3, 6.5, 6.7, 6.2]],
  ["Lenny Wilkens", "1961-1975", "PG", "Hawks, SuperSonics, Cavaliers, Trail Blazers", "early playmaking guard", [7.8, 7.3, 7.0, 7.6, 5.8, 6.9, 6.5]],
  ["Terry Cummings", "1983-2000", "PF", "Clippers, Bucks, Spurs, 76ers, Knicks, Warriors", "scoring power forward", [7.8, 7.5, 6.5, 7.1, 5.4, 6.9, 6.1]],
  ["Buck Williams", "1982-1998", "PF", "Nets, Trail Blazers, Knicks", "rebounding defensive forward", [8.1, 7.2, 7.0, 7.5, 4.7, 8.1, 6.2]],
  ["Mark Aguirre", "1982-1994", "SF", "Mavericks, Pistons, Clippers", "scoring forward", [7.5, 7.7, 7.5, 7.0, 6.2, 6.1, 6.2]],
  ["Rasheed Wallace", "1996-2013", "PF/C", "Bullets, Trail Blazers, Hawks, Pistons, Celtics, Knicks", "stretch defensive big", [7.8, 7.4, 7.8, 8.0, 7.0, 8.1, 6.1]],
  ["Shawn Marion", "2000-2015", "SF/PF", "Suns, Heat, Raptors, Mavericks, Cavaliers", "versatile defensive forward", [7.7, 7.5, 7.5, 8.7, 6.7, 8.2, 5.9]],
  ["Joe Johnson", "2002-2022", "SG/SF", "Celtics, Suns, Hawks, Nets, Heat, Jazz, Rockets", "isolation scoring wing", [7.9, 7.4, 6.5, 7.4, 7.5, 6.2, 5.9]],
  ["Kyle Lowry", "2007-2024", "PG", "Grizzlies, Rockets, Raptors, Heat, 76ers", "two-way floor general", [7.7, 7.3, 7.9, 8.0, 7.5, 7.8, 6.0]],
  ["Al Horford", "2008-active", "C/PF", "Hawks, Celtics, 76ers, Thunder", "switchable connector big", [7.8, 7.2, 7.9, 8.3, 6.6, 8.1, 5.8]],
  ["Rajon Rondo", "2007-2022", "PG", "Celtics, Mavericks, Kings, Bulls, Pelicans, Lakers, Hawks, Clippers, Cavaliers", "playoff passing guard", [7.1, 7.3, 8.4, 8.2, 5.8, 7.6, 5.9]],
  ["Derrick Rose", "2009-2024", "PG", "Bulls, Knicks, Cavaliers, Timberwolves, Pistons, Grizzlies", "explosive scoring guard", [6.4, 8.7, 6.7, 7.4, 6.6, 5.9, 6.2]],
  ["Deron Williams", "2006-2017", "PG", "Jazz, Nets, Mavericks, Cavaliers", "strong pick-and-roll guard", [7.0, 7.9, 7.0, 7.7, 7.3, 6.3, 5.9]],
  ["Elton Brand", "2000-2016", "PF/C", "Bulls, Clippers, 76ers, Mavericks, Hawks", "scoring rebounding big", [7.3, 7.8, 6.3, 7.1, 4.9, 7.7, 5.8]],
  ["Brad Daugherty", "1987-1994", "C", "Cavaliers", "efficient passing center", [5.9, 8.0, 7.0, 7.5, 5.3, 7.2, 5.8]],
  ["Larry Nance", "1982-1994", "PF", "Suns, Cavaliers", "athletic defensive forward", [7.3, 7.4, 6.9, 7.8, 4.9, 8.2, 5.9]],
  ["Fat Lever", "1983-1994", "PG", "Trail Blazers, Nuggets, Mavericks", "rebounding defensive guard", [6.8, 7.7, 6.7, 8.2, 5.8, 7.8, 5.8]],
  ["Michael Cooper", "1979-1991", "SG/SF", "Lakers", "defensive championship wing", [7.0, 6.8, 8.1, 7.8, 6.1, 8.8, 6.2]],
  ["Andre Iguodala", "2005-2023", "SF/SG", "76ers, Nuggets, Warriors, Heat", "defensive connector wing", [7.8, 7.0, 8.2, 8.6, 6.5, 8.5, 6.0]],
  ["Jrue Holiday", "2010-active", "PG/SG", "76ers, Pelicans, Bucks, Celtics", "elite defensive guard", [7.4, 7.4, 8.0, 8.3, 6.9, 8.8, 5.8]],
  ["Khris Middleton", "2013-active", "SF", "Pistons, Bucks", "shot-making championship wing", [6.8, 7.5, 7.9, 7.5, 7.7, 6.9, 5.6]],
  ["Pascal Siakam", "2017-active", "PF", "Raptors, Pacers", "transition two-way forward", [6.5, 7.7, 7.6, 8.2, 6.2, 7.7, 5.7]],
  ["Bam Adebayo", "2018-active", "C", "Heat", "switchable defensive center", [6.2, 7.7, 7.8, 8.4, 4.8, 8.9, 5.6]],
  ["DeMar DeRozan", "2010-active", "SG/SF", "Raptors, Spurs, Bulls, Kings", "midrange scoring wing", [7.7, 7.8, 6.4, 7.2, 5.9, 6.2, 5.8]],
  ["Donovan Mitchell", "2018-active", "SG", "Jazz, Cavaliers", "playoff scoring guard", [6.2, 8.1, 7.4, 7.3, 8.0, 6.0, 5.7]],
  ["Domantas Sabonis", "2017-active", "C/PF", "Thunder, Pacers, Kings", "passing rebounding big", [6.2, 7.8, 6.2, 8.1, 5.7, 6.7, 5.6]],
  ["Jalen Brunson", "2019-active", "PG", "Mavericks, Knicks", "craft scoring guard", [5.7, 8.2, 7.4, 7.4, 7.6, 5.9, 5.4]],
  ["Anthony Edwards", "2021-active", "SG", "Timberwolves", "athletic scoring wing", [5.2, 8.3, 7.0, 7.8, 7.5, 7.0, 5.2]],
];

function goatScoreFor(player) {
  return player.L * weights.L + player.P * weights.P + player.PO * weights.PO + player.V * weights.V + player.G * weights.G + player.W * weights.W + player.A * weights.A;
}

function peakDecadeFor(era) {
  const years = String(era).match(/\d{4}/g)?.map(Number) || [];
  const start = years[0] || 2000;
  const end = String(era).includes("active") ? 2026 : years[1] || start + 8;
  const careerLength = Math.max(1, end - start + 1);
  const peakOffset = Math.min(8, Math.max(4, Math.round(careerLength * 0.42)));
  const peakYear = start + peakOffset;
  return `${Math.floor(peakYear / 10) * 10}s`;
}

function roundMetric(value) {
  return Math.round(value * 10) / 10;
}

function rescaleToScore(player, targetScore) {
  const currentScore = goatScoreFor(player);
  const scale = currentScore > 0 ? targetScore / currentScore : 1;
  const metrics = Object.fromEntries(
    metricKeys.map((key) => [key, roundMetric(clamp(player[key] * scale, 0, 10))])
  );
  return {
    ...player,
    ...metrics,
    goatScore: goatScoreFor(metrics),
  };
}

function normalizeName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

const aliasKeys = new Map([
  ["natearchibald", "tinyarchibald"],
  ["amarestoudemire", "amarestoudemire"],
]);

function canonicalKey(name) {
  const normalized = normalizeName(name);
  return aliasKeys.get(normalized) || normalized;
}

const providedByName = new Map(providedRankings.map((player) => [canonicalKey(player.player), player]));
const seededPlayers = playerSeeds.map(([name, era, position, teams, archetype, scores]) => {
  const provided = providedByName.get(canonicalKey(name));
  const [seedL, seedP, seedPO, seedV, seedG, seedW, seedA] = scores;
  const metrics = provided
    ? { L: provided.L, P: provided.P, PO: provided.PO, V: provided.V, G: provided.G, W: provided.W, A: provided.A }
    : { L: seedL, P: seedP, PO: seedPO, V: seedV, G: seedG, W: seedW, A: seedA };
  return {
    name,
    era,
    position,
    teams,
    archetype,
    sourceRank: provided?.rank,
    ...metrics,
    goatScore: goatScoreFor(metrics),
  };
});

const seededByName = new Map(seededPlayers.map((player) => [canonicalKey(player.name), player]));
const dedupedProvided = [...providedByName.values()].sort((a, b) => a.rank - b.rank);

const providedPlayers = dedupedProvided.map((provided) => {
  const seed = seededByName.get(canonicalKey(provided.player));
  const metrics = { L: provided.L, P: provided.P, PO: provided.PO, V: provided.V, G: provided.G, W: provided.W, A: provided.A };
  return {
    name: provided.player,
    era: seed?.era || "provided list",
    position: seed?.position || "NBA",
    teams: seed?.teams || "provided ranking data",
    archetype: seed?.archetype || "provided profile",
    ...metrics,
    goatScore: goatScoreFor(metrics),
    sourceRank: provided.rank,
    rank: provided.rank,
    rankSource: "provided",
  };
});
const remainingStartScore = Math.min(...providedPlayers.map((player) => player.goatScore)) - 0.05;

const remainingPlayers = seededPlayers
  .filter((player) => !providedByName.has(canonicalKey(player.name)))
  .sort((a, b) => b.goatScore - a.goatScore)
  .map((player, index) => {
    const targetScore = Math.max(3.5, remainingStartScore - index * 0.035);
    return {
      ...rescaleToScore(player, targetScore),
      rankSource: "rescaled after provided top 100",
    };
  });

const database = [...providedPlayers, ...remainingPlayers]
  .sort((a, b) => b.goatScore - a.goatScore || (a.sourceRank || 999) - (b.sourceRank || 999))
  .map((player, index) => ({
    ...player,
    rank: index + 1,
    peakEra: peakDecadeFor(player.era),
  }));

const els = {
  search: document.querySelector("#player-search"),
  random: document.querySelector("#random-player"),
  body: document.querySelector("#rankings-body"),
  sort: document.querySelector("#sort-select"),
  era: document.querySelector("#era-filter"),
  limitButtons: document.querySelectorAll(".limit-button"),
  customLimitForm: document.querySelector("#custom-limit-form"),
  customLimit: document.querySelector("#custom-limit"),
  rankingsTitle: document.querySelector("#rankings-title"),
  rankingsNote: document.querySelector("#rankings-note"),
  profile: document.querySelector("#profile-panel"),
  empty: document.querySelector("#profile-empty"),
  categoryCards: document.querySelector("#category-cards"),
  databaseSize: document.querySelector("#database-size"),
  topScore: document.querySelector("#top-score"),
};

const fmt = (value) => value.toFixed(2);
const maxDisplayLimit = 450;
let displayLimit = 100;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderCategories() {
  els.categoryCards.innerHTML = categories
    .map(([key, name, weight, bullets]) => `
      <article class="category-card">
        <h3>${name} <span>${key} | ${weight}</span></h3>
        <ul>${bullets.map((item) => `<li>${item}</li>`).join("")}</ul>
      </article>
    `)
    .join("");
}

function renderRankings(sortKey = els.sort?.value || "rank") {
  const requested = Math.min(displayLimit, maxDisplayLimit);
  const eraFilter = els.era?.value || "all";
  const filteredDatabase = eraFilter === "all"
    ? database
    : database.filter((player) => player.peakEra === eraFilter);
  const available = Math.min(requested, filteredDatabase.length);
  const visibleRows = filteredDatabase.slice(0, available);
  const rows = [...visibleRows].sort((a, b) => {
    if (sortKey === "rank") return a.rank - b.rank;
    if (sortKey === "score") return b.goatScore - a.goatScore;
    return b[sortKey] - a[sortKey] || a.rank - b.rank;
  });

  els.rankingsTitle.textContent = eraFilter === "all"
    ? `Top ${requested} NBA GOAT rankings`
    : `Top ${requested} NBA GOAT rankings | ${eraFilter} peaks`;
  els.rankingsNote.textContent = requested > filteredDatabase.length
    ? `Showing ${filteredDatabase.length} scored players${eraFilter === "all" ? "" : ` with ${eraFilter} peak estimates`}. Custom leaderboard commands are capped at top ${maxDisplayLimit}.`
    : `Showing ${available} players${eraFilter === "all" ? "" : ` with ${eraFilter} peak estimates`}. Rank still shows the overall GOAT_SCORE rank.`;

  els.body.innerHTML = rows
    .map((player) => `
      <tr data-name="${player.name}">
        <td>#${player.rank}</td>
        <td>
          <span class="player-cell">
            <strong>${escapeHtml(player.name)}</strong>
            <small>${escapeHtml(player.position)} | ${escapeHtml(player.era)} | peak ${escapeHtml(player.peakEra)}</small>
          </span>
        </td>
        <td>${fmt(player.goatScore)}</td>
        ${metricKeys.map((key) => `<td>${player[key].toFixed(1)}</td>`).join("")}
      </tr>
    `)
    .join("");
}

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function strongest(player) {
  return metricKeys
    .map((key) => ({ key, value: player[key], label: categories.find((category) => category[0] === key)[1] }))
    .sort((a, b) => b.value - a.value);
}

function reasonText(player) {
  const strengths = strongest(player).slice(0, 3).map((item) => item.label.toLowerCase());
  const weakness = strongest(player).at(-1);
  const top100Text = player.rank <= 100 ? "inside the top 100" : "outside the displayed top 100";
  return `${player.name} lands ${top100Text} because the formula rewards ${strengths.join(", ")} while still charging the profile for a lower ${weakness.label.toLowerCase()} score. The rank is computed from the weighted category scores, so a narrow edge in longevity or peak can move a player several spots.`;
}

function ignoredText() {
  return "The model does not directly score popularity, highlight style, teammate quality, era nostalgia, market size, single-game records, or ring-count arguments by themselves. Championships show up only lightly through accolades and more strongly when playoff performance supports them.";
}

function rankedWith(player) {
  return [...database, player]
    .sort((a, b) => b.goatScore - a.goatScore)
    .map((item, index) => ({ ...item, rank: index + 1 }));
}

function showProfile(player, ranking = database) {
  const rankedPlayer = ranking.find((item) => item.name === player.name) || player;
  const above = ranking[rankedPlayer.rank - 2];
  const below = ranking[rankedPlayer.rank];
  const scoreRows = metricKeys
    .map((key) => {
      const label = categories.find((category) => category[0] === key)[1];
      return `
        <div class="score-line">
          <span>${key} ${label}</span>
          <div class="bar"><span style="--w:${rankedPlayer[key] * 10}%"></span></div>
          <strong>${rankedPlayer[key].toFixed(1)}</strong>
        </div>
      `;
    })
    .join("");

  const strengths = strongest(rankedPlayer);
  const topStrength = strengths[0];
  const secondStrength = strengths[1];
  const softSpot = strengths[strengths.length - 1];
  const sourceNote = rankedPlayer.estimated
    ? "Estimated profile from the real-stat inputs entered in this browser session."
    : `${rankedPlayer.position} | ${rankedPlayer.era} | ${rankedPlayer.teams}`;
  const safeName = escapeHtml(rankedPlayer.name);

  els.empty.classList.add("hidden");
  els.profile.classList.remove("hidden");
  els.profile.innerHTML = `
    <div class="profile-top">
      <div>
        <div class="player-identity">
          <div class="avatar">${escapeHtml(initials(rankedPlayer.name))}</div>
          <div>
            <div class="rank-badge">
              <span>Rank</span>
              <strong>#${rankedPlayer.rank}</strong>
            </div>
            <h2>${safeName}</h2>
            <p class="player-meta">${escapeHtml(sourceNote)}</p>
          </div>
        </div>
      </div>
      <div class="score-stack">${scoreRows}</div>
    </div>
    <div class="insight-grid">
      <article class="insight-card">
        <h3>GOAT_SCORE ${fmt(rankedPlayer.goatScore)}</h3>
        <p>${escapeHtml(reasonText(rankedPlayer))}</p>
      </article>
      <article class="insight-card">
        <h3>Profile read</h3>
        <p>A ${escapeHtml(rankedPlayer.archetype)} profile. Best model edges: ${topStrength.label} (${topStrength.value.toFixed(1)}) and ${secondStrength.label} (${secondStrength.value.toFixed(1)}).</p>
      </article>
      <article class="insight-card">
        <h3>Rank neighbors</h3>
        <div class="neighbors">
          <div class="neighbor"><span>One above</span><strong>${above ? `#${above.rank} ${escapeHtml(above.name)}` : "No one"}</strong></div>
          <div class="neighbor"><span>One below</span><strong>${below ? `#${below.rank} ${escapeHtml(below.name)}` : "End of database"}</strong></div>
        </div>
      </article>
      <article class="insight-card">
        <h3>What it considers</h3>
        <p>Durable value, best-prime dominance, postseason translation, system fit, spacing pressure, two-way lift, and major awards.</p>
      </article>
      <article class="insight-card">
        <h3>What it ignores</h3>
        <p>${ignoredText()}</p>
      </article>
      <article class="insight-card">
        <h3>Soft spot</h3>
        <p>${softSpot.label} is the lowest category at ${softSpot.value.toFixed(1)}, which limits the weighted total compared with nearby players.</p>
      </article>
      <article class="insight-card">
        <h3>Top 100 status</h3>
        <p>${rankedPlayer.rank <= 100 ? "This player is in the displayed top 100 table." : "This player is outside the displayed top 100, but the site still computes their formula rank against the full scored field."}</p>
      </article>
      <article class="insight-card">
        <h3>Formula contribution</h3>
        <p>${metricKeys.map((key) => `${key}: ${(rankedPlayer[key] * weights[key]).toFixed(2)}`).join(" | ")}</p>
      </article>
    </div>
  `;
  els.profile.scrollIntoView({ behavior: "smooth", block: "center" });
}

function showNoMatch(query) {
  const safeQuery = escapeHtml(query);
  els.profile.classList.add("hidden");
  els.empty.classList.remove("hidden");
  els.empty.innerHTML = `
    <div class="estimator-panel">
      <div class="estimator-head">
        <h2>Estimate ${safeQuery}</h2>
        <p>
          This player is not in the scored database yet. Enter real career, playoff, shooting,
          defensive, and accolade stats, then the site will assign 0-10 category values and rank
          the player against the current leaderboard. The custom board still defaults to top 100.
        </p>
      </div>
      <form id="estimator-form" class="estimator-form">
        ${estimatorField("estimate-name", "Player", query, "text")}
        ${estimatorField("estimate-seasons", "Seasons", 6, "number")}
        ${estimatorField("estimate-minutes", "Minutes", 12000, "number")}
        ${estimatorField("estimate-allnba", "All-NBA", 0, "number")}
        ${estimatorField("estimate-mvp", "MVP", 0, "number")}
        ${estimatorField("estimate-fmvp", "Finals MVP", 0, "number")}
        ${estimatorField("estimate-champs", "Titles", 0, "number")}
        ${estimatorField("estimate-alldef", "All-Defense", 0, "number")}
        ${estimatorField("estimate-dpoy", "DPOY", 0, "number")}
        ${estimatorField("estimate-scoring", "Scoring titles", 0, "number")}
        ${estimatorField("estimate-ppg", "Career PPG", 12, "number")}
        ${estimatorField("estimate-ts", "TS%", 55, "number")}
        ${estimatorField("estimate-ast", "AST/G", 3, "number")}
        ${estimatorField("estimate-reb", "REB/G", 4, "number")}
        ${estimatorField("estimate-stocks", "STL+BLK/G", 1.2, "number")}
        ${estimatorField("estimate-playoff-ppg", "Playoff PPG", 10, "number")}
        ${estimatorField("estimate-playoff-games", "Playoff games", 20, "number")}
        ${estimatorField("estimate-deep-runs", "Conf finals runs", 0, "number")}
        ${estimatorField("estimate-threepa", "3PA/G", 2, "number")}
        ${estimatorField("estimate-threep", "3P%", 34, "number")}
        <div class="estimator-field">
          <label for="estimate-defense">Defense</label>
          <select id="estimate-defense">
            <option value="4">Below average</option>
            <option value="5.5" selected>Average</option>
            <option value="7">Strong</option>
            <option value="8.5">All-Defense level</option>
            <option value="9.5">DPOY level</option>
          </select>
        </div>
      </form>
      <div class="estimator-actions">
        <button id="estimate-player" type="button">Compute ranking</button>
        <span>Use exact stats when you have them. Empty fields are treated as zero.</span>
      </div>
    </div>
  `;
}

function estimatorField(id, label, value, type) {
  return `
    <div class="estimator-field">
      <label for="${id}">${label}</label>
      <input id="${id}" type="${type}" value="${escapeHtml(value)}" ${type === "number" ? 'step="0.1" min="0"' : ""} />
    </div>
  `;
}

function clamp(value, min = 0, max = 10) {
  return Math.max(min, Math.min(max, value));
}

function statValue(id) {
  const input = document.querySelector(`#${id}`);
  return Number.parseFloat(input?.value || "0") || 0;
}

function textValue(id, fallback) {
  const input = document.querySelector(`#${id}`);
  return input?.value.trim() || fallback;
}

function buildEstimatedPlayer() {
  const name = textValue("estimate-name", els.search.value.trim() || "Estimated Player");
  const seasons = statValue("estimate-seasons");
  const minutes = statValue("estimate-minutes");
  const allNba = statValue("estimate-allnba");
  const mvps = statValue("estimate-mvp");
  const finalsMvps = statValue("estimate-fmvp");
  const titles = statValue("estimate-champs");
  const allDefense = statValue("estimate-alldef");
  const dpoy = statValue("estimate-dpoy");
  const scoringTitles = statValue("estimate-scoring");
  const ppg = statValue("estimate-ppg");
  const ts = statValue("estimate-ts");
  const assists = statValue("estimate-ast");
  const rebounds = statValue("estimate-reb");
  const stocks = statValue("estimate-stocks");
  const playoffPpg = statValue("estimate-playoff-ppg");
  const playoffGames = statValue("estimate-playoff-games");
  const deepRuns = statValue("estimate-deep-runs");
  const threeAttempts = statValue("estimate-threepa");
  const threePct = statValue("estimate-threep");
  const defense = statValue("estimate-defense");

  const L = clamp(minutes / 5200 + seasons * 0.24 + allNba * 0.22);
  const P = clamp(ppg * 0.16 + Math.max(0, ts - 50) * 0.13 + assists * 0.28 + rebounds * 0.11 + stocks * 0.42 + mvps * 0.75 + scoringTitles * 0.28);
  const PO = clamp(playoffPpg * 0.18 + playoffGames / 34 + deepRuns * 0.48 + finalsMvps * 0.75 + titles * 0.22);
  const V = clamp(4.2 + Math.min(2.2, assists * 0.24) + Math.min(1.4, rebounds * 0.12) + Math.min(1.8, defense * 0.18) + (threeAttempts > 4 ? 0.7 : 0));
  const G = clamp(2.2 + threeAttempts * 0.62 + Math.max(0, threePct - 31) * 0.13 + ppg * 0.08 + assists * 0.08);
  const W = clamp(defense * 0.58 + P * 0.27 + allDefense * 0.24 + dpoy * 0.7 + stocks * 0.32);
  const A = clamp(mvps * 1.25 + finalsMvps * 1.0 + titles * 0.42 + allNba * 0.32 + allDefense * 0.18 + dpoy * 0.82 + scoringTitles * 0.28);
  const goatScore = L * weights.L + P * weights.P + PO * weights.PO + V * weights.V + G * weights.G + W * weights.W + A * weights.A;

  return {
    name,
    era: "custom estimate",
    position: "custom",
    teams: "entered stats",
    archetype: "stat-estimated",
    estimated: true,
    L,
    P,
    PO,
    V,
    G,
    W,
    A,
    goatScore,
  };
}

function computeEstimatedRanking() {
  const estimatedPlayer = buildEstimatedPlayer();
  const ranking = rankedWith(estimatedPlayer);
  const rankedPlayer = ranking.find((player) => player.name === estimatedPlayer.name);
  showProfile(rankedPlayer, ranking);
}

function findPlayer(query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return null;
  return database.find((player) => player.name.toLowerCase() === normalized)
    || database.find((player) => player.name.toLowerCase().includes(normalized));
}

function handleSearch() {
  const query = els.search.value.trim();
  const player = findPlayer(query);
  if (player) {
    showProfile(player);
  } else if (query.length > 2) {
    showNoMatch(query);
  }
}

function initTableEvents() {
  els.body.addEventListener("click", (event) => {
    const row = event.target.closest("tr");
    if (!row) return;
    const player = database.find((item) => item.name === row.dataset.name);
    if (player) {
      els.search.value = player.name;
      showProfile(player);
    }
  });

  els.empty.addEventListener("click", (event) => {
    if (event.target.id === "estimate-player") {
      computeEstimatedRanking();
    }
  });
}

function setDisplayLimit(nextLimit) {
  displayLimit = clamp(Math.round(Number.parseInt(nextLimit, 10) || 100), 1, maxDisplayLimit);
  els.limitButtons.forEach((button) => {
    button.classList.toggle("active", Number.parseInt(button.dataset.limit, 10) === displayLimit);
  });
  renderRankings();
}

function setupCanvas() {
  const canvas = document.querySelector("#motion-court");
  const ctx = canvas.getContext("2d");
  const particles = Array.from({ length: 56 }, (_, index) => ({
    x: Math.random(),
    y: Math.random(),
    r: 1.2 + Math.random() * 2.8,
    speed: 0.00055 + Math.random() * 0.0012,
    color: index % 3 === 0 ? "#ff8a3d" : index % 3 === 1 ? "#34d6c3" : "#ffd166",
  }));

  function resize() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  }

  function draw(time) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.globalAlpha = 0.34;
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1;
    for (let x = -80; x < window.innerWidth + 80; x += 90) {
      ctx.beginPath();
      ctx.moveTo(x + Math.sin(time * 0.0002) * 14, 0);
      ctx.lineTo(x - 140, window.innerHeight);
      ctx.stroke();
    }

    particles.forEach((particle) => {
      particle.y += particle.speed;
      if (particle.y > 1.08) particle.y = -0.08;
      const x = particle.x * window.innerWidth + Math.sin(time * 0.001 + particle.x * 12) * 28;
      const y = particle.y * window.innerHeight;
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(x, y, particle.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
}

function init() {
  renderCategories();
  renderRankings();
  initTableEvents();
  setupCanvas();
  els.databaseSize.textContent = database.length;
  els.topScore.textContent = fmt(database[0].goatScore);
  els.search.addEventListener("input", handleSearch);
  els.search.addEventListener("keydown", (event) => {
    if (event.key === "Enter") handleSearch();
  });
  els.sort.addEventListener("change", () => renderRankings(els.sort.value));
  els.era.addEventListener("change", () => renderRankings());
  els.limitButtons.forEach((button) => {
    button.addEventListener("click", () => setDisplayLimit(button.dataset.limit));
  });
  els.customLimitForm.addEventListener("submit", (event) => {
    event.preventDefault();
    setDisplayLimit(els.customLimit.value);
  });
  els.random.addEventListener("click", () => {
    const player = database[Math.floor(Math.random() * database.length)];
    els.search.value = player.name;
    showProfile(player);
  });
  showProfile(database[0]);
}

init();

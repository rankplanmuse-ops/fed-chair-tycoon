# -*- coding: utf-8 -*-
# Fed Chair Tycoon: complete text inventory. Columns: Section | Text | Location | Use / When it appears | Appearance
R = []
def add(sec, text, loc, use, app): R.append([sec, text, loc, use, app])

# ---------- Title screen ----------
add("Title screen","FED CHAIR TYCOON","Title screen, hero centre","The game's title","Huge Baloo 2 display type, white, gold coin spinning above it")
add("Title screen","One lever. Two ways to fall.","Title screen, under the title","Tagline","Small light text")
add("Title screen","START YOUR TERM","Title screen, main button","Starts a run: loader, then briefing (or straight into a term)","Large gold button")
add("Title screen","Difficulty:","Title screen and Settings","Label for the 3 difficulty circles: 1 filled = Intern, 2 = Chair, 3 = Legend","Small label beside three circles, filled up to the chosen level")
add("Title screen","HALL OF CHAIRS","Title screen, secondary button","Opens the leaderboard sheet","Ghost (outline) button")
add("Title screen","HOW TO PLAY","Title screen, secondary button","Opens the briefing card","Ghost (outline) button")
add("Title screen","A satire in 48 months \u00b7 v0.1","Title screen, footer","Version and flavour line","Tiny muted footer text")
add("Title screen","$  /  \u20bf (coin faces)","Title screen and loading screen","Decorative coin: dollar face, Bitcoin face; flips to Bitcoin during loading","Gold coin, orange Bitcoin side with white \u20bf")
add("Browser","Fed Chair Tycoon","Browser tab / page title","Names the page","Standard tab title text")

# ---------- Loading screen ----------
LOAD_APP = "Monospace Courier Prime, one line at a time, centre screen, with a gold progress bar under it"
LOAD_USE = "Plays in sequence (about 1s per line) every time a term starts; tap anywhere to skip"
for t in ["PRINTING MONEY","WARMING UP THE PRINTER","CALLING IT TRANSITORY","BLAMING SUPPLY CHAINS","RAISING THE DEBT CEILING","SCHEDULING A PRESS CONFERENCE","MOVING THE GOALPOSTS","BURYING THE REPORT"]:
    add("Loading screen",t,"Loading screen, centre line",LOAD_USE,LOAD_APP)
add("Loading screen","SYNCING EXCUSES","Loading screen, centre line","Ninth loading line; at this exact line the coin flips from $ to the Bitcoin face",LOAD_APP)
for t in ["DUCK HUNTING IN GEORGIA","CHECKING IN UNDER FIRST NAMES","COUNTING WHEELBARROWS"]:
    add("Loading screen",t,"Loading screen, centre line",LOAD_USE,LOAD_APP)
add("Loading screen","TAP TO SKIP","Loading screen, bottom","Hint that the loading sequence can be skipped","Small muted text")

# ---------- Briefing ----------
add("Briefing","THE BRIEFING","Briefing card, ribbon over the street artwork","Card header","Gold ribbon banner")
add("Briefing","The job is yours","Briefing card, headline","Card title","Large Baloo 2, white")
add("Briefing","The job was designed in secret. November 1910, Jekyll Island, Georgia: seven men checked into a hunting club under first names only: a senator, Morgan men, a Rockefeller bank president, a Treasury official. The cover story was duck hunting. Nine days later they had drafted a central bank. You are what they built. Hold inflation near 2%, keep the street calm, and survive 48 months.","Briefing card, body paragraph","Story intro and the win condition","Body text; dates and key phrases in bold")
add("Briefing","The needle. Green is calm. Blue is recession, red is inflation. Peg either end and your term ends.","Briefing card, rule row 1","Explains the gauge","Rule row with a green dot icon")
add("Briefing","The lever. One interest rate, moved in 0.25 steps. It works slowly, like everything in this building.","Briefing card, rule row 2","Explains the one control","Rule row with up/down triangle icon")
add("Briefing","Items. Washington speak, single use: speeches, blame, emergency buttons. They reset the street, briefly.","Briefing card, rule row 3","Explains crisis items","Rule row with a lightning icon")
add("Briefing","The trap. Cheap money builds projects that only look good at cheap rates. They show up in GDP first. They bust later, when you hike, and the bust was built in the boom.","Briefing card, rule row 4","Explains the malinvestment and bust mechanic","Rule row with a temple icon")
add("Briefing","Five lives. When the needle pegs, an emergency meeting pulls you back from the edge. You get five per term. The sixth crisis is final.","Briefing card, rule row 5","Explains the 5 emergency meetings","Rule row with a heart icon")
add("Briefing","TAKE THE LEVER","Briefing card, bottom button","Starts the term","Large primary button")

# ---------- HUD ----------
add("HUD","DEBT","HUD, top left, label above the number","Labels the national debt ticker","Small caps label")
add("HUD","$38,412,905,221,114 (live value)","HUD, top left","The national debt; climbs continuously, and climbs faster the higher your rate (and in wartime)","Large white tabular number")
add("HUD","MONTH 1/48 (live)","HUD, top right pill","Current month of the 48-month term","Dark pill, white bold text")
add("HUD","GAS $3.49 (live value)","Price chip row under the HUD","Live gas price; updates in steps every 3 seconds","Dark chip with a hand-drawn fuel pump icon")
add("HUD","EGGS $2.99 (live value)","Price chip row under the HUD","Live eggs price; updates in steps every 3 seconds","Dark chip with a hand-drawn egg carton icon")
add("HUD","JOBS 4.2% (live value)","Price chip row under the HUD","Unemployment rate","Dark chip with a hand-drawn briefcase icon")
add("HUD","LIVES 5 (live value)","Price chip row under the HUD","Emergency meetings remaining","Dark chip with a hand-drawn heart icon")
add("HUD","BTC RESERVE $0 (live value)","Price chip row, hidden until the reserve is signed","Current value of the Bitcoin reserve","Dark chip with orange border and Bitcoin icon")

# ---------- Control panel ----------
add("Control panel","KELVIN WALSH","Panel, top left, beside the chair's portrait","Your name as chair (parody of Kevin Warsh)","Bold white caps")
add("Control panel","INFLATION","Panel, top right, label","Labels the big inflation readout; a red up arrow or green down arrow appears next to it showing the trend","Small gold caps")
add("Control panel","2.4% (live value)","Panel, top right","Current inflation; glides continuously as you move the lever","Large Baloo 2 white number")
add("Control panel","RECESSION","Needle bar, left end","The cold end of the gauge","Small blue caps inside the gradient bar")
add("Control panel","INFLATION","Needle bar, right end","The hot end of the gauge","Small red caps inside the gradient bar")
add("Control panel","5.00% (live value)","Panel, centre","The interest rate: your one lever","Largest number in the panel, Baloo 2")
add("Control panel","INTEREST RATE","Panel, under the rate value","Label for the rate","Small caps")
add("Control panel","\u25b2 and \u25bc","Panel, left, two stacked buttons","Raise / cut the rate in 0.25 steps","Two large pale buttons, 68 x 42 px")
add("Control panel","ITEM","Item slot, top label","Labels the crisis item slot","Small caps on the slot")
add("Control panel","EMPTY","Item slot, centre","Shown when no item is held","Muted red text on a dark slot with a dashed red border")
add("Control panel","(item name, live)","Item slot, centre","Name of the held item, e.g. BLAME SUPPLY CHAINS","Bold white caps on a solid pulsing red button")
add("Control panel","TAP TO USE","Item slot, under the item name","Hint, only shown while an item is held","Tiny text")

# ---------- Side bars ----------
add("Side bars","GDP","Left edge bar, top label","Gross domestic product gauge","White label chip")
add("Side bars","+2.1% (live value)","Left edge bar, bottom chip","Current GDP growth; a striped fake segment inside the bar marks malinvestment","Value chip; green fill in a grey metal V-bottom tube with a green sweet-spot zone (1 to 3.5%)")
add("Side bars","CPI","Right edge bar, top label","Inflation gauge (consumer prices)","White label chip")
add("Side bars","2.4% (live value)","Right edge bar, bottom chip","Current inflation; the bar pulses orange, then red, as it gets dangerous","Value chip; fill in a grey metal V-bottom tube with a green sweet-spot zone (1.5 to 3%)")

# ---------- Desktop rails ----------
add("Desktop rails","The Daily Ledger","Left rail, masthead (desktop only)","Name of the in-game newspaper","Courier Prime masthead")
add("Desktop rails","TERM MONTH 1 \u00b7 WEEK 1 \u00b7 WASHINGTON (live)","Left rail and Wire sheet","Dateline, updates with game time","Small Courier caps")
add("Desktop rails","ALL THE NEWS THE NEEDLE MAKES","Left rail, footer (desktop only)","Newspaper motto","Tiny caps footer")
add("Desktop rails","YOUR TERM","Right rail, panel title (desktop only)","Live stats panel header","Small caps")
add("Desktop rails","MONTH / INFLATION / RATE / DEBT ADDED","Right rail, stat rows (desktop only)","Live term statistics (values are live)","Label plus large value")
add("Desktop rails","HALL OF CHAIRS \u00b7 TOP 5","Right rail, panel title (desktop only)","Mini leaderboard","Small caps")
add("Desktop rails","THE JOB","Right rail, tip panel title (desktop only)","Standing advice header","Small caps")
add("Desktop rails","Keep the needle in the green for 48 months. Rates bite with a lag, the debt ticker never stops, and both ends of the street are always angry about something.","Right rail, tip panel (desktop only)","Standing advice","Body text")

# ---------- News Wire sheet chrome ----------
add("News Wire","The Daily Ledger","Wire sheet, header","Sheet title","Courier Prime masthead")
add("News Wire","LIVE","Wire sheet, header, right","Live indicator","Green pulsing dot plus caps text")
add("News Wire","0 UNREAD (live count)","Wire sheet, footer","Unread headline counter","Small text")
add("News Wire","MARK ALL READ","Wire sheet, footer button","Marks every headline read","Small button")
add("News Wire","BREAKING:","Wire item, prefix","Flags a breaking headline","Red bold prefix")
add("News Wire","MARKET WARNING","Wire item, stamp","Flags a warning headline","Small red stamp chip")
add("News Wire","Nothing yet. The street is quiet.","Wire list, empty state","Placeholder before the first headline posts","Single muted list item")
add("News Wire","(Paper name) \u00b7 M1 W1 (live)","Every wire item, meta line","Source paper and in-game timestamp. Papers: Hill Insider, Main Street Post, Savers\u2019 Gazette, Union Daily, Bond Watch, Capitol Ledger, Orange Sheet","Small grey meta text; op-ed headlines are shown in italics")

# ---------- Ambient wire headlines ----------
AMB_LOC = "News Wire list and desktop left rail"
AMB_APP = "Headline text under its paper name; op-eds in italics"
def amb(text, use): add("Wire headlines (ambient)", text, AMB_LOC, use, AMB_APP)
amb("Eggs hit $X a dozen. Nobody is laughing. (Main Street Post)","Posted when inflation is 6% or more; $X is the live eggs price")
amb("Pensions lost ground again this month. Retirees are noticing. (Savers\u2019 Gazette)","Posted when inflation is 4% or more")
amb("Workers demand raises that match the prices. All of them. (Union Daily)","Posted when inflation is 3% or more")
amb("The line at the job centre now starts before sunrise. (Main Street Post)","Posted when unemployment is 7% or more")
amb("Another plant cuts shifts. The canteen is quiet. (Union Daily)","Posted when unemployment is 5.5% or more")
amb("Borrowers are screaming. Bondholders are not. (Bond Watch)","Posted when your rate is 7% or more")
amb("Cheap money is back. So are the wild ideas. (Bond Watch)","Posted when your rate is 3% or less")
amb("Cranes everywhere. Half the new projects have no buyers yet. (Main Street Post)","Posted when hidden malinvestment reaches 35")
amb("Condos, apps, a monorail to nowhere: all pencilled at cheap rates. (Bond Watch)","Posted when hidden malinvestment reaches 55")
amb("These projects only work if money stays free forever. It will not. (Savers\u2019 Gazette)","Posted when hidden malinvestment reaches 70")
amb("Gas at $X. Drivers are doing the maths out loud. (Main Street Post)","Posted when gas reaches $6; $X is the live gas price")
amb("Rents renewed this month. Nobody renewed cheap. (Main Street Post)","Posted when inflation is 2.5% or more")
amb("Coffee is up again. The cafe blames everything. (Main Street Post)","Posted when overall prices are up 5%")
amb("Used cars cost more than new ones did. Somehow. (Main Street Post)","Posted when inflation is 3.5% or more")
amb("Bread costs what cake used to. The street noticed. (Main Street Post)","Posted when overall prices are up 12%")
amb("On the record: this bank was drafted at a duck hunt in Georgia in 1910. A duck hunt. (Hill Insider)","Always in the ambient pool: Jekyll Island flavour")
amb("Seven men, first names only, one private train from Hoboken. That is the founding paperwork. (Hill Insider)","Always in the ambient pool: Jekyll Island flavour")
amb("The Jekyll Island clubhouse still keeps the room. It is called the Federal Reserve Room. (Main Street Post)","Always in the ambient pool: Jekyll Island flavour")
amb("A founder confessed in 1935: \u2018I was as secretive as any conspirator. We left our last names behind.\u2019 (Savers\u2019 Gazette)","Always in the ambient pool: Jekyll Island flavour")
amb("Opinion: the Creature sends its regards. (Savers\u2019 Gazette)","Always in the ambient pool; op-ed, shown in italics")
amb("A later audit counted $16 trillion in secret emergency loans. The street got a comment period. (Hill Insider)","Always in the ambient pool")
amb("The bank buys corporate bonds now. Even the junk ones. Especially the junk ones. (Bond Watch)","Always in the ambient pool")
amb("The dollar has lost over 96% of its value since 1913. The bank calls this \u2018about 2% a year\u2019. (Savers\u2019 Gazette)","Always in the ambient pool")
amb("Member banks own the regional banks and draw a fixed 6% dividend. Ownership has privileges. (Main Street Post)","Always in the ambient pool")
amb("Zombie firms walk again: kept alive by cheap credit, eating the living. (Union Daily)","Always in the ambient pool")
amb("Reserve requirements have been zero since March 2020. The vault is a vibe now. (Hill Insider)","Always in the ambient pool")
amb("A chair once took rates to 20% on purpose. Old-timers still whisper about it. (Main Street Post)","Always in the ambient pool")
amb("Opinion: price-fixing is illegal, unless the price is money. (Savers\u2019 Gazette)","Always in the ambient pool; op-ed, shown in italics")
amb("Senators ask, again, who exactly is in charge of prices. (Hill Insider)","Always in the ambient pool")
amb("The Hill blames the chair. The chair blames the data. (Hill Insider)","Always in the ambient pool")
amb("The street is calm. The street is watching. (Main Street Post)","Always in the ambient pool")
amb("The bakery raised prices a little and apologised a lot. (Main Street Post)","Always in the ambient pool")
amb("Bond traders nap. Yields drift. Nobody panics, yet. (Bond Watch)","Always in the ambient pool")
amb("Opinion: the printer is not a policy. (Savers\u2019 Gazette)","Always in the ambient pool; op-ed, shown in italics")

# ---------- System / event wire pushes ----------
def push(text, use, app="Headline text; flagged posts also carry the BREAKING or MARKET WARNING stamp"):
    add("Wire headlines (events)", text, "News Wire list and desktop left rail", use, app)
push("A new chair takes the lever. The street holds its breath. (Hill Insider)","Posted at the start of every term")
push("Eggs at $2.99, gas at $3.49. Remember this calm. (Main Street Post)","Posted at the start of every term")
push("Pensions are shrinking. The retirees are marching on the bank. (Savers\u2019 Gazette)","Hot-side warning, with the Savers warning card; BREAKING + MARKET WARNING")
push("Dole queues round the block. The street wants work, not speeches. (Union Daily)","Cold-side warning, with the Union warning card; BREAKING + MARKET WARNING")
push("A debt relief measure lands on the desk: stack bitcoin, cap the bleeding. (Capitol Ledger)","Strategic Bitcoin Reserve scenario; BREAKING")
push("The reserve dies in committee. The printer keeps the pen. (Capitol Ledger)","Posted if you decline the Bitcoin reserve")
push("War breaks out overseas. Gas spikes overnight. (Main Street Post)","War scenario; BREAKING")
push("Oil shock: tanker trouble sends fuel prices climbing. (Main Street Post)","Oil shock scenario; BREAKING")
push("Housing bust: the cranes have stopped. (Union Daily)","Housing bust scenario; BREAKING")
push("The chair has vanished for a weekend. Georgia, apparently. Duck season. (Hill Insider)","Jekyll Island Weekend scenario; BREAKING")
push("Emergency lending, off the books, again. Details in a few years, maybe. (Bond Watch)","Secret Bailout scenario; BREAKING")
push("Two regional presidents resign over their portfolios. The ethics forms are being redesigned. (Hill Insider)","Trading Scandal scenario; BREAKING")
push("The bank is shopping for corporate bonds. The junk shelf too. (Bond Watch)","Corporate Bond Shopping scenario; BREAKING")
push("The bust: cranes stopped, projects folding, layoffs in a row. The boom was borrowed. (Main Street Post)","The Austrian bust; BREAKING + MARKET WARNING")
push("Prices jumped this month. Nobody knows why. Everybody knows who to blame. (Main Street Post)","Random monthly price jolt; BREAKING")
push("Layoffs spiked this month. The canteen is quiet again. (Union Daily)","Random monthly jobs jolt")
push("Ceasefire signed. The convoys are going home. (Main Street Post)","Posted when the war ends (after about 6 months)")
push("Controls lifted. The gas sign catches up all at once. (Main Street Post)","Posted when price controls expire; BREAKING")
push("The reserve is up X% this month. The debt clock noticed. (Orange Sheet)","Posted when the Bitcoin reserve gains more than 14% in a month; X is live")
push("The reserve is down X% this month. The stackers send their regards. (Orange Sheet)","Posted when the Bitcoin reserve falls more than 13% in a month; X is live")

# ---------- Items ----------
IT_LOC = "Control panel, item slot (name shown on the slot)"
IT_APP = "Bold white caps on the solid pulsing red slot"
add("Items","BLAME SUPPLY CHAINS",IT_LOC,"Single-use crisis item: cools the inflation side (inflation drops). A new item arrives 5 to 8 months after one is used",IT_APP)
add("Items","\u201cTRANSITORY\u201d SPEECH",IT_LOC,"Single-use crisis item: cools the inflation side",IT_APP)
add("Items","BLAME CORPORATE GREED",IT_LOC,"Single-use crisis item: cools the inflation side. (The paired right-side blame item)",IT_APP)
add("Items","BLAME GOVERNMENT SPENDING",IT_LOC,"Single-use crisis item: cools the inflation side. (The paired left-side blame item)",IT_APP)
add("Items","EMERGENCY QE",IT_LOC,"Single-use crisis item: cools the recession side (unemployment drops, inflation rises a little)",IT_APP)
add("Items","RATE SHOCK THERAPY",IT_LOC,"Single-use crisis item: cools the recession side",IT_APP)
add("Items","EMERGENCY PRESS CONFERENCE",IT_LOC,"Single-use crisis item: works on whichever side of the needle is worse",IT_APP)

# ---------- Cards: shared ----------
add("Cards (shared)","RECESSION / INFLATION","Mini needle bar inside every card","Shows where the needle sits when the card appears","Mini gradient bar with the needle dot and blue/red end labels")
add("Cards (shared)","OPEN THE WIRE","Warning cards, secondary button","Opens the News Wire instead of acting","Dark secondary button")

# ---------- Warning cards ----------
add("Warning cards","WARNING \u00b7 SAVERS\u2019 GAZETTE","Card tag, top","Hot-side warning card (inflation danger)","Amber warning tag chip")
add("Warning cards","Savers are marching","Warning card title","Hot-side warning","Large Baloo 2 title")
add("Warning cards","Prices are eating pensions alive. If the needle pegs at INFLATION, the crowd stops asking and starts choosing.","Warning card body","Hot-side warning","Body text")
add("Warning cards","BACK TO PRINTING","Warning card, gold button","Dismisses the warning and resumes play","Gold button")
add("Warning cards","WARNING \u00b7 UNION DAILY","Card tag, top","Cold-side warning card (recession danger)","Amber warning tag chip")
add("Warning cards","The queues are growing","Warning card title","Cold-side warning","Large Baloo 2 title")
add("Warning cards","Rates this high are strangling the street. If the needle pegs at RECESSION, the President finds a new chair.","Warning card body","Cold-side warning","Body text")
add("Warning cards","PRINT OUR WAY OUT","Warning card, gold button","Dismisses the warning and resumes play","Gold button")
add("Warning cards","Warnings arrive before the needle pegs. Usually.","Warning cards, hint line","Flavour hint under the buttons","Small muted hint text")

# ---------- Scenario cards ----------
SC_LOC = "Full-screen card over the street; the game pauses while it is up"
SC_APP = "SCENARIO tag chip, Baloo 2 title, body text, gold button(s), small hint line"
def sc(title, body, btn, hint, use, tag="SCENARIO"):
    add("Scenario cards", title + "  |  " + body + "  |  Button: " + btn + ("  |  Hint: " + hint if hint else ""), SC_LOC, use + " (card tag: " + tag + ")", SC_APP)
sc("STRATEGIC BITCOIN RESERVE","The debt is compounding faster than the economy. The proposal: take the seized stockpile, buy a million bitcoin, and let the hardest money on earth eat the softest debt ever printed. Signing puts $40B on the ticker today. After that the reserve rides the market, and every gain comes straight off the national debt.","SIGN IT. STACK SATS / KEEP PRINTING PAPER (a real choice: sign or decline)","Debt relief, the orange way.","From month 12, once debt added passes $1.2T; can happen once")
sc("WAR BREAKS OUT","Jets overhead, convoys on the road, and the gas sign is spinning. The debt ticker just found a second gear. Hike and risk the street, or hold and feed the fire.","BACK TO THE WAR ROOM","War lasts about 6 months. It does not ask permission.","From month 8; war raises gas 2.6x, adds inflation pressure and faster debt for about 6 months")
sc("OIL SHOCK","A tanker, a strait, a problem. Fuel jumps and everything that rides on a truck follows it up.","BLAME THE TANKER","","From month 4; fuel and inflation jump")
sc("TECH BOOM","A new gadget has the whole street queueing and hiring. Jobs bloom, and so do prices, a little.","TAKE THE CREDIT","","From month 5; unemployment drops, slight inflation")
sc("HOUSING BUST","The cranes stopped. The for-sale signs multiplied. The street is losing work faster than prices are falling.","BACK TO THE BAILOUTS","","From month 6; unemployment rises")
sc("BOND VIGILANTES","The bond market is selling first and asking later. Yields spike. (Second sentence depends on your rate: \u2018They think your rate is a joke.\u2019 if it is under 5.5%, else \u2018Your high rate earns a grudging nod.\u2019)","BACK TO BEGGING MARKETS","","From month 7; extra inflation pressure if your rate is low")
sc("JEKYLL ISLAND WEEKEND","An unmarked invitation: a hunting club in Georgia, first names only, no staff, no guest book. The men who built this bank in 1910 would approve. The street calms a little. The club, as always, sends the bill to the debt ticker.","BACK TO THE DUCK HUNT","Documented: November 1910, the Aldrich Plan was drafted here in nine days. It became the Federal Reserve Act of 1913.","From month 10, once; calms inflation and jobs toward target, debt rises slightly")
sc("THE SECRET BAILOUT","Overnight, the window opens for the big banks: emergency loans, below-market rates, no press release. The street calms down fast. The pile of too-big-to-fail grows quietly in the back, and the bill goes to the ticker, as always.","BACK TO THE BACK ROOM","Documented: a 2011 audit counted $16.1 trillion in emergency loans from 2007-2010, much of it secret at the time.","From month 12, once; calms the street, malinvestment +15, debt +1%")
sc("THE TRADING SCANDAL","Reporters have the brokerage statements: senior officials traded millions in stocks and property funds while setting the very policy that moved those prices. Two regional presidents resign by Friday. Your credibility takes the hit: prices believe you a little less.","BACK TO THE ETHICS FORMS","Documented: the 2020-21 trading scandal forced resignations and a full rewrite of the ethics rules, after the fact.","From month 14, once; inflation +0.6 (credibility hit)","SCANDAL")
sc("CORPORATE BOND SHOPPING","A first in the bank\u2019s history: the printer is now buying company debt directly, blue chips and junk alike. Markets cheer, GDP perks up, and a few more projects that should not exist now never have to die.","BACK TO THE SHOPPING","Documented: in 2020 the bank bought corporate bonds for the first time, high-yield \u2018junk\u2019 included.","From month 16, once; GDP boost, malinvestment +12")
sc("SUPPLY CHAINS SNARL AGAIN","Ports jam, parts vanish, shelves thin out. The street has heard this excuse before. It is true anyway.","BLAME THE PORTS","","From month 3; inflation pressure +1.0")

# ---------- Serfdom Ladder ----------
add("Serfdom Ladder","PRICE CONTROLS  |  The Hill has had enough of your needle. An official price board goes up: gas is frozen by law. The sign stops. The queues start. Underneath, the pressure keeps building.  |  Button: FREEZE EVERYTHING  |  Hint: The ladder only advances while you are losing. It never moves back.","Full-screen card (tag: SERFDOM LADDER \u00b7 STAGE 7)","Ladder stage 1 in-game (Hayek stage 7): appears after sustained danger on the needle; the gas sign freezes at the current price for 4 months","Story tag chip, Baloo 2 title, body, gold button, hint line")
add("Serfdom Ladder","WAGE CONTROLS  |  Prices were only the means. Now wages need permission too, and a new office allots both. Your lever still moves. It just matters less.  |  Button: ALLOT THE WAGES  |  Hint: The ladder only advances while you are losing. It never moves back.","Full-screen card (tag: SERFDOM LADDER \u00b7 STAGE 8)","Ladder stage 2 in-game (Hayek stage 8): controls deepen","Story tag chip, Baloo 2 title, body, gold button, hint line")
add("Serfdom Ladder","THE END OF TRUTH  |  Loudspeakers on the bank. Posters of your face. From today, the panel publishes a calmer inflation number. The street keeps its own count.  |  Button: REVISE THE NUMBERS  |  Hint: Displayed inflation is now revised. Street prices are not.","Full-screen card (tag: SERFDOM LADDER \u00b7 STAGE 12)","Ladder stage 3 in-game (Hayek stage 12): for 3 months the panel shows inflation at 60% of the real number; street prices stay honest","Story tag chip, Baloo 2 title, body, gold button, hint line")

# ---------- Bust ----------
add("The Bust","THE RECKONING ARRIVES  |  The cranes stop. Projects that only made sense at cheap rates fold in a row, and the jobs go with them. GDP just corrected down 30%: the fake growth was never real. You did not build this bust with your hike. You built it in the boom, one cheap month at a time.  |  Button: FACE THE RECKONING  |  Hint: The pile is smaller now. What is left is real.","Full-screen card (tag: MALINVESTMENT \u00b7 THE BUST)","Fires when the malinvestment pile is tall and you hike, or the pile maxes out: GDP is set to -30%, jobs spike","Story tag chip, Baloo 2 title, body, gold button, hint line")

# ---------- Emergency meetings ----------
EM_APP = "EMERGENCY MEETING tag chip, Baloo 2 title, body ending with the live count of meetings left, gold button, hint line"
add("Emergency meetings","THE COMMITTEE BLINKS FIRST  |  Sunday night. The governors on a secure call, one sentence in the statement. The rescue drags inflation back from the edge and the crowd goes home, for now. The ticker sends its regards. Emergency meetings left: X.  |  Button: ADJOURN THE MEETING  |  Hint: Five per term. The sixth crisis is yours alone.","Full-screen card, replaces death while lives remain","Hot-side save: inflation is pulled back from the edge; each save works less well and scars the economy (inflation target rises)",EM_APP)
add("Emergency meetings","PRINTING AT MIDNIGHT  |  The facility opens before the markets do. Credit flows, the queues shorten, the dole offices empty by Friday. It was bought with the printer, and the bill is already on the ticker. Emergency meetings left: X.  |  Button: ADJOURN THE MEETING  |  Hint: Five per term. The sixth crisis is yours alone.","Full-screen card, replaces death while lives remain","Cold-side save: unemployment is pulled back; adds malinvestment and scarring (jobs target rises)",EM_APP)

# ---------- Endings ----------
add("Endings (inflation)","INFLATION ENDING \u00b7 MONTH X","Death screen, ribbon","Shown when inflation kills the term; X is the month reached","Red ribbon banner")
add("Endings (inflation)","THE CROWD HAS CHOSEN","Death screen, stamp","Inflation ending headline","Huge Baloo 2 stamp text")
add("Endings (inflation)","Gas touched $X and the street stopped asking for a plan. It demanded a strongman instead. The Minister of Prices has taken your office, your chair, and your parking space.","Death screen, body","Inflation ending story; $X is the final gas price","Body text")
add("Endings (inflation)","X MO / PEAK X% / DEBT +$X T (live values)","Death screen, summary chips","Term summary at a glance","Three small chips")
add("Endings (recession)","RECESSION ENDING \u00b7 MONTH X","Death screen, ribbon","Shown when recession kills the term","Blue ribbon banner")
add("Endings (recession)","THE WHITE HOUSE / MEMORANDUM / From: The President / Re: Termination of appointment","Death screen, memo header","The firing memo's letterhead","Courier Prime on a paper memo card")
add("Endings (recession)","Markets have fallen for three straight months and the dole queues are on the evening news. This is not personal. It is entirely personal. Clear your desk by Friday. The plant by the elevator is not yours to take.","Death screen, memo body","Recession ending story","Courier body text on the memo")
add("Endings (recession)","Severance: a book deal, a speaking tour, and a podcast.","Death screen, memo fine print","Joke fine print","Small italic line")
add("Endings (recession)","Echoes of 1929-1933, when this bank raised rates into the crash and let the money supply collapse. An ex-chair admitted it decades later: \u201cWe did it. We\u2019re very sorry.\u201d","Death screen, footnote","Historical footnote to the recession ending","Small footnote text")
add("Endings (both)","SEE TERM REPORT / NEW TERM","Death screens, buttons","Go to the report, or start over","Gold button and dark button")

# ---------- Term Report ----------
add("Term Report","BOARD OF GOVERNORS \u00b7 OFFICIAL","Report card, header","Document letterhead","Small caps with a $ seal")
add("Term Report","Term Report","Report card, header","Document title","Large title text")
add("Term Report","GRADE","Report card, top right label","Labels the letter grade","Small label under a large grade letter (A+ down to F, computed from needle control, peak inflation and ladder stages)")
add("Term Report","You served the full term and handed back a working currency. The street grumbles, as is tradition.","Report card, verdict line","Verdict for a clean full term","Italic verdict sentence")
add("Term Report","You kept your job for 48 months. The country kept the controls.","Report card, verdict line","Verdict for surviving with Serfdom Ladder stages in force (the dark win)","Italic verdict sentence")
add("Term Report","You kept your job for X months. Then you signed the letter.","Report card, verdict line","Verdict for resigning; X is months served","Italic verdict sentence")
add("Term Report","You kept your job for X months. The street remembers the rest.","Report card, verdict line","Verdict for being ousted; X is months served","Italic verdict sentence")
add("Term Report","MONTHS SERVED / PEAK INFLATION / DEBT ADDED / HOW IT ENDED / EMERGENCY MEETINGS / LIVES LEFT / BITCOIN RESERVE","Report card, stat grid labels","The seven report statistics (values are live; Bitcoin Reserve shows its value or \u2018None\u2019)","Small caps label over a large value in each cell")
add("Term Report","Full term / Ousted - inflation / Ousted - recession / Resigned","Report card, HOW IT ENDED value","The four possible endings as report text","Value text")
add("Term Report","YOUR TERM, MONTH BY MONTH","Report card, strip label","Labels the 48-square needle history strip (blue = recession months, red = inflation, green = calm, yellow = warm)","Small caps over a row of coloured squares")
add("Term Report","SHARE YOUR TERM","Share box, title","Share section header","Small caps")
add("Term Report","My term as Fed Chair: X/48 months. Peak inflation X%, debt +$X T, grade X. Ended: (ending). The street remembers.","Share box preview and the shared post itself","The share text (system share sheet, X post, or clipboard); all values are live","Monospace-ish preview box above the share buttons")
add("Term Report","Share / X / (copy icon)","Share box, buttons","Share natively, post to X, or copy the text","Three buttons")
add("Term Report","NEW TERM / HALL OF CHAIRS","Report screen, bottom buttons","Start again, or view the leaderboard","Two buttons")

# ---------- Hall of Chairs ----------
add("Hall of Chairs","Hall of Chairs","Leaderboard sheet, title","Sheet title","Sheet header title")
add("Hall of Chairs","ALL TIME / THIS WEEK / FRIENDS","Leaderboard sheet, segment tabs","Filter tabs (ALL TIME is the populated view)","Segmented control")
add("Hall of Chairs","KELVIN WALSH","Leaderboard rows (and your pinned identity)","Your saved terms are filed under this name","Bold name; your rows are highlighted")
add("Hall of Chairs","Printy McPrintface \u00b7 SURVIVED \u00b7 48 mo","Leaderboard, seeded rival row","Fake rival chair","Medal 1 (gold), name, green status, months")
add("Hall of Chairs","Steady Eddie \u00b7 SURVIVED \u00b7 48 mo","Leaderboard, seeded rival row","Fake rival chair","Medal 2 (silver), name, green status, months")
add("Hall of Chairs","Hawkish Hank \u00b7 SURVIVED \u00b7 47 mo","Leaderboard, seeded rival row","Fake rival chair","Medal 3 (bronze), name, green status, months")
add("Hall of Chairs","Dovish Dan \u00b7 RESIGNED \u00b7 44 mo","Leaderboard, seeded rival row","Fake rival chair","Name, amber status, months")
add("Hall of Chairs","Goldie \u00b7 OUSTED - INFLATION \u00b7 41 mo","Leaderboard, seeded rival row","Fake rival chair","Name, red status, months")
add("Hall of Chairs","Ratey Katie \u00b7 IMPEACHED \u00b7 39 mo","Leaderboard, seeded rival row","Fake rival chair","Name, red status, months")
add("Hall of Chairs","Chairman Moe \u00b7 OUSTED - RECESSION \u00b7 36 mo","Leaderboard, seeded rival row","Fake rival chair","Name, red status, months")
add("Hall of Chairs","Old Man Winters \u00b7 RESIGNED \u00b7 33 mo","Leaderboard, seeded rival row","Fake rival chair","Name, amber status, months")
add("Hall of Chairs","X mo / +$X T debt (live values)","Leaderboard rows, right side","Months served and debt added for each chair","Two-line numbers, right aligned")

# ---------- Settings ----------
add("Settings","Settings","Settings sheet, title","Sheet title","Sheet header title")
add("Settings","GAMEPLAY","Settings sheet, group label","Toggle group header","Small caps group label")
add("Settings","Sound FX","Settings, toggle row","Turns the generated sound effects on/off","Row with a yellow dot and a switch")
add("Settings","Music","Settings, toggle row","Turns the background music on/off","Row with a blue dot and a switch")
add("Settings","Tune","Settings, row","Shows the current music track; tap to cycle to the next","Row with a green dot and a pill button showing the track name")
add("Settings","Monkeys Spinning Monkeys / Merry Go / Pixelland","Settings, Tune row value (cycles)","The three royalty-free music tracks by Kevin MacLeod (CC BY 4.0). Default is Monkeys Spinning Monkeys","Track name inside the pill button")
add("Settings","News ticker","Settings, toggle row","Shows/hides the GAS / EGGS / JOBS / LIVES chip row","Row with a coral dot and a switch")
add("Settings","Haptics","Settings, toggle row","Vibration toggle (decorative on web)","Row with a purple dot and a switch")
add("Settings","Difficulty:","Settings, under the toggles","Same 3-circle difficulty picker as the title screen","Label plus three circles")
add("Settings","END THIS TERM EARLY","Settings, resignation card title","Resignation section header","Letter card with a red FED seal stamp")
add("Settings","Dear Mr. President, I hereby tender my resignation as Chair, effective immediately.","Settings, resignation letter body","The resignation letter","Serif letter text on the card")
add("Settings","\u2014 The Chair","Settings, resignation letter signature","Signature line","Signature line")
add("Settings","Ends your current term. The term is scored and filed in the Hall of Chairs. There is no coming back from a signature.","Settings, resignation fine print","Explains what resigning does","Small fine print")
add("Settings","SIGN & RESIGN","Settings, resignation button","Ends the term immediately as a resignation","Red button")
add("Settings","FED CHAIR TYCOON v0.1 \u00b7 A satire. / Any resemblance to a real central bank is entirely the point. / Music by Kevin MacLeod (incompetech.com), CC BY 4.0.","Settings sheet, footer","Colophon and the required music attribution","Tiny muted footer text")

# ---------- Toasts ----------
TO_APP = "Small dark pill that pops up over the street for about 2.4 seconds"
add("Toasts","NEW ITEM DELIVERED","Toast, over the street","A new crisis item has arrived in the slot",TO_APP)
add("Toasts","(ITEM NAME) USED","Toast, over the street","Confirms an item was fired, e.g. BLAME SUPPLY CHAINS USED",TO_APP)
add("Toasts","PRICE CONTROLS LIFTED","Toast, over the street","The 4-month gas price freeze has expired",TO_APP)
add("Toasts","RESERVE ESTABLISHED: 1,000,000 BTC","Toast, over the street","Confirms signing the Strategic Bitcoin Reserve",TO_APP)
add("Toasts","NO TERM IN PROGRESS","Toast, over the street","Resign tapped while no term is running",TO_APP)
add("Toasts","COPIED TO CLIPBOARD / COPIED","Toast, over the street","Share text copied (fallback when native share is unavailable)",TO_APP)
add("Toasts","COPY FAILED","Toast, over the street","Clipboard write failed",TO_APP)

# ---------- Scene artwork and live overlays ----------
add("Scene artwork","CENTRAL BANK","Baked into all 5 street plates, on the bank pediment, top centre","Names the bank on the hill","Dark blue serif caps on the stone pediment")
add("Scene artwork (live overlays)","(live gas price, e.g. 3.49)","Painted over the gas station sign board (left side) in every plate","THE live gas price in the artwork: changes in steps every 3 seconds with a split-flap flip; freezes solid under price controls","Baloo 2 chunky digits matching each plate's sign colours (yellow on orange-red for normal and war, red tones for inflation and disaster, pale tan for recession), black outline")
add("Scene artwork (live overlays)","EGGS + (live price)","Painted over the market window card (right side) in normal, inflation, disaster and war plates","THE live eggs price in the artwork: steps every 3 seconds and flips on change. No overlay in the recession plate (the market is closed)","White paper card look: EGGS in black caps over a bold price, tilted like the baked card")
add("Scene artwork (live overlays)","(live price)","Painted over the small yellow price tag beside the window card (normal and war plates)","Second live eggs price, on the tag","Bold price on a yellow tag")
add("Scene artwork (baked)","GA / GAS","Gas station sign, left, all plates (cut by the frame edge in normal and recession)","Sign lettering; the live price board sits under it","White chunky letters on an orange-red board")
add("Scene artwork (baked)","3.4 (normal) / 7.89 (inflation) / 2.8 (recession) / 999 (disaster) / 18.4 (war)","Baked into the sign price boards","The plates' original printed prices; fully covered by the live price overlay in play","Chunky digits with black outline")
add("Scene artwork (baked)","MARKET (normal, war) / SUPERMARKET (inflation, disaster) / RMARKET (recession, cut sign)","Market sign, right side","Shop name","Yellow chunky letters with green outline")
add("Scene artwork (baked)","EGGS 2.99 + 2.99 tag (normal) / EGGS 11.99 card and EGGS 14.99 tag (inflation) / EGGS 4.99 (disaster) / EGGS 6.99 cards (war)","Baked into the market windows","The plates' printed eggs prices; the main card is covered by the live overlay (the small red tag in inflation stays as decoration)","Paper card and tag lettering in the window")
add("Scene artwork (baked)","FUEL","Gas station canopy (recession and disaster plates)","Station branding","Yellow letters on a dark red plaque")
add("Scene artwork (baked)","CLOSED / FOR SALE","Recession plate: market door and a yard sign","Recession flavour: the market is shut, a plot is for sale","White CLOSED sign hanging on the door; red FOR SALE letters on a white yard sign")
add("Scene artwork (baked)","SALE +30% / PRICE +40% / NOW +33% / LIMIT (and similar small tags)","Disaster and inflation plates, market windows","Panic-pricing flavour tags","Small red sale tags in the windows")

import json
hdr = ["Section","Text","Location","Use / When it appears","Appearance"]
print(len(R))
with open("/home/hatch/workspace/fed-chair-tycoon/sheet/rows.json","w") as f:
    json.dump([hdr]+R, f, ensure_ascii=False)

# CD009 Transmission Swap Guide
## Volvo S90 B6304 Turbo Build — Stage 3

### Overview

The Nissan CD009 is the 6-speed manual transmission from the 2003–2008 Nissan 350Z and Infiniti G35. It's one of the most popular swap gearboxes in the enthusiast community — swapped into everything from LS-powered builds to JZ-swapped cars. The ecosystem of adapter plates, clutch kits, shifter relocation hardware, and crossmembers is mature and well-supported.

**Why the CD009 for this build:**
- Abundant in US junkyards — 350Zs and G35s are everywhere
- Cheap: $300–$600 for a used unit
- 6 speeds with a proper 0.80 overdrive 6th gear
- Handles 400–500 hp reliably with a quality clutch — well within the 350 hp target
- Massive swap community means parts and knowledge are accessible

**This swap happens at the same time as the engine swap.** The built turbo B6304 and CD009 are mated on the engine stand, then dropped into the car together as a unit.

---

### Gear Ratios

| Gear | Ratio |
|---|---|
| 1st | 3.79:1 |
| 2nd | 2.32:1 |
| 3rd | 1.62:1 |
| 4th | 1.27:1 |
| 5th | 1.00:1 |
| 6th | 0.80:1 |
| Reverse | 3.49:1 |

Note: 5th is 1:1 — 6th is the overdrive gear. At highway cruise in 6th, RPMs will be noticeably lower than 5th. Good for a daily driver and fuel economy.

---

### Parts List

#### 1. The Gearbox

**Nissan CD009 6-speed manual transmission**
- Source: 2003–2008 Nissan 350Z or Infiniti G35 (VQ35DE engine, non-HR)
- **Important:** The HR/VHR 350Z (2007–2008 with twin throttle bodies) uses a different transmission with an internal concentric slave cylinder and a different bellhousing bolt pattern. Stick to the 2003–2006 350Z or 2003–2006 G35 for the correct CD009.
- Source: Car-Part.com, eBay, local junkyards, Pick-n-Pull
- Cost: $300–$600
- Fluid: Nissan OEM MTF (look for the yellow sticker on the gearbox) or Redline MT-90 GL-4. Do NOT use GL-5 — it will destroy the synchros.

#### 2. Adapter Plate — Deeworks.ca (Solved)

**[Deeworks.ca](https://deeworks.ca/product/volvo-whiteblock-and-toyota-2jz-to-350z-370z-g35-g37-6-speed-transmission-adapter/)** makes a purpose-built CNC-machined billet 6061-T6 aluminum adapter plate specifically for the Volvo White Block to CD009/CD00A swap. This is the exact part you need — no commissioning required.

**How it works:**
- The CD009's factory bellhousing is cut off (the transmission case is retained — only the cast bellhousing is removed). Deeworks provides instructions and there are YouTube videos showing the process. It's easier than it sounds.
- The adapter bolts to your **960 automatic bellhousing** on the engine side — meaning you keep and reuse your existing auto bellhousing as the engine-side interface.
- The adapter then accepts the CD009 transmission case on the other side.
- Uses an **internal T56-style release bearing** (concentric slave cylinder) — cleaner than an external fork setup.
- Dual bolt pattern supports both stock slanted engine orientation and vertical (straight) setup.

**What's included in the kit:**
- CNC billet adapter plate
- All required hardware (M10, M12, M8, M6 bolts)
- OEM Nissan input shaft seal
- OEM Nissan bearing cover gasket
- Pilot bushing sleeve (OilLite)
- AN-4 hydraulic line adapter for the T56 release bearing
- 1/8" spacer for release bearing
- Thread sealant
- Printed installation instructions

**Input shaft bearing size note:** The CD009 comes in 3 variants with different input shaft bearing sizes. All Deeworks adapters are machined for 100mm bearing — adapter rings are supplied for smaller bearing sizes. Before ordering, remove the bearing cover on your transmission and measure the bearing OD to confirm which ring (if any) you need.

**Price:** Check deeworks.ca for current pricing. Contact them at info@deeworks.ca with questions about your specific setup.

**Important note from Deeworks:** Tunnel clearance in the 700/900 series has not been fully tested yet. They recommend waiting until a few users have completed installations and reported back before committing if you need a guaranteed bolt-in solution. Post on Turbobricks to find anyone who has done this swap in a 960/S90 and confirm tunnel fitment before ordering.

#### 3. Pilot Bearing / Bushing

**Included in the Deeworks kit** — an OilLite pilot bushing sleeve is supplied. Install it into the crankshaft end with a small piece of wood or aluminum so you don't distort the inside diameter. The bushing has a larger bevel on one side of the inside diameter — that side faces the transmission.

#### 4. Flywheel

The auto flexplate is useless — you need a flywheel. **Deeworks built their adapter around the Volvo 850R flywheel** — this is the recommended flywheel for this swap. It's a known-good combination with the Sachs 765 pressure plate.

- **850R flywheel** — source from a Volvo 850R donor, eBay, or FCP Euro. The 850R is a White Block car so the crank bolt pattern is the same family.
- **Single-mass flywheel only.** Do not use a dual-mass flywheel on a turbo build.
- **ARP flywheel bolts** — always use ARP hardware on a performance build. ~$65.

If you use a different flywheel/pressure plate combination, you must verify proper slave cylinder engagement — the 1/8" spacer included in the Deeworks kit is specifically calibrated for the 850R flywheel + Sachs 765 pressure plate combo.

#### 5. Clutch Kit

**Deeworks recommends the Sachs 765 pressure plate** paired with the 850R flywheel. This is the tested combination the adapter was built around.

- **Pressure plate:** Sachs 765 (strong, but note: heavier pedal feel and the engagement point is close to the floor)
- **Clutch disc:** Must have the **Nissan CD009 input shaft spline** — sized to match your flywheel diameter. Source from South Bend Clutch, Spec, or ACT specifying the CD009 spline.
- **Throwout bearing / release bearing:** The Deeworks adapter uses an **internal T56-style concentric slave cylinder** (release bearing). Source from a **1998–2002 Camaro with 5.7L engine** — Deeworks specifically calls this out. Refer to their product page photos for model identification.

For 350 hp / ~350 lb-ft, the Sachs 765 + 850R flywheel combo is well within spec. The 765 pressure plate is on the stiffer side — expect a firmer clutch pedal than stock, which is normal for a performance build.

Cost: $400–$700 for a complete clutch kit.

#### 6. Hydraulic Clutch System

The Deeworks adapter uses an **internal T56-style concentric slave cylinder (release bearing)** — this is cleaner than an external fork setup and eliminates the clutch fork entirely.

- **T56 release bearing (concentric slave cylinder):** Source from a **1998–2002 Camaro with 5.7L engine**. Deeworks includes photos on their product page for model identification. This mounts directly to the adapter plate with the included M6 bolts and 1/8" spacer.
- **AN-4 hydraulic line adapter:** Included in the Deeworks kit. Replaces the stock GM quick-connect fitting on the T56 slave cylinder.
- **Clutch master cylinder:** Must have a **7/8" bore or larger** — Deeworks specifically warns that a 3/4" or smaller bore will not move sufficient fluid to fully disengage the clutch. Source from any manual 940 (common in US junkyards) or buy a universal aftermarket unit. ~$50–$100.
- **Hydraulic line:** Runs from the master cylinder in the engine bay to the AN-4 fitting on the slave cylinder. A braided stainless -4AN line is the right choice. ISR Performance makes braided clutch lines for CD009 swaps (~$60), or have a local hydraulic shop make one to length.
- **Clutch pedal assembly:** Source from a manual 940 Turbo (common in US junkyards — the 940 Turbo was available with a manual). The pedal box bolts into the 960 firewall with minor modification. ~$50–$150.

#### 8. Shifter Relocation Kit

**This is a known issue with the CD009 in non-350Z chassis.** The CD009's factory shifter exits the top of the transmission approximately 26 inches from the bellhousing face. In most swap applications, this puts the shifter 4–6 inches too far rearward — ending up behind the center console or in an awkward position.

**Solution — shifter relocation kit:**
- **GKTech V2 CD009 Shifter Relocation Setup** — the most popular solution. Bolt-on kit that moves the shifter forward to a usable position. ~$150–$200. Available at us.gktech.com.
- **Sikky Manufacturing CD009 Shifter Relocation** — another well-regarded option. ~$100–$150.
- **Autosports Engineering CD009 Shifter Relocation** — front-mount design. ~$100.

You'll need to measure where the shifter exits relative to your console opening and choose the relocation distance accordingly. Most kits offer some adjustability.

#### 9. Transmission Mount and Crossmember

The CD009 needs to be located and supported in the tunnel. The AW30-40 crossmember will not work — the CD009 is a different shape and sits in a different position.

**Options:**
- **Fabricate a custom crossmember** — a local fabricator can build a simple steel crossmember that picks up the existing 960 tunnel mounting points and supports the CD009 at the correct height and angle. This is straightforward fab work — a few hours for a competent welder. Budget $150–$300.
- **Universal transmission mount** — a universal rubber transmission mount (Energy Suspension or similar) bolts to the CD009's mount pad. The crossmember holds the mount. ~$30–$50 for the mount rubber.

The CD009's mount pad is on the bottom of the case. Measure the distance from the engine centerline to the mount pad and fabricate the crossmember to locate it correctly.

#### 10. Driveshaft

The CD009's output flange is a different diameter and the transmission is a different length than the AW30-40. Your existing driveshaft will not fit.

**What you need:**
- Measure the distance from the output flange of the CD009 (in its installed position) to the rear differential input flange.
- Take the car (or just the measurements) to a driveshaft shop. They will build a custom front driveshaft half (or a one-piece shaft if appropriate) to the correct length with the correct flange patterns on each end.
- **Driveshaft shop cost:** $300–$600 for a custom steel shaft. Aluminum is lighter but more expensive (~$600–$900).
- Replace the giubo (flex disc) at the differential end while you're in there. ~$50–$80.
- Replace the center support bearing if running a two-piece shaft. ~$40–$60.

**Output flange:** The CD009 uses a 4-bolt flange. Confirm the bolt pattern with your driveshaft shop before they build the shaft.

#### 11. Console and Interior

The shifter will come up through the center console in a different location than the auto selector. You'll need to:
- Cut or modify the console opening to fit the manual shifter
- Source or fabricate a shifter boot and surround
- Remove the auto shift indicator and selector trim

This is cosmetic work — do it last, after the drivetrain is confirmed working.

#### 12. Electrical

- **Clutch safety switch** — wires to the clutch pedal. The car should only start with the clutch pedal depressed. Wire a simple normally-open switch to the starter circuit. ~$15 for a universal switch.
- **Reverse lights** — connect to the CD009's reverse light switch (it has one). Run a wire to your existing reverse light circuit.
- **Park/Neutral Position (PNP) switch bypass** — the factory auto ECU uses the PNP switch to allow starting. With a standalone ECU (Megasquirt/Haltech, which you're already running at Stage 3), this is handled in the ECU configuration — no factory PNP circuit to worry about.
- **Speedometer** — the AW30-40 has an electronic speed sensor. The CD009 also has a speed sensor output. Verify the signal type matches your standalone ECU's input, or run a GPS-based speedometer signal.

---

### Build Sequence

**On the engine stand (before swap weekend):**
1. Source and inspect the CD009. Verify all gears engage cleanly. Check for leaks. Measure the input shaft bearing OD before ordering the Deeworks kit.
2. Order the **Deeworks adapter kit** from deeworks.ca. Confirm bearing size and orientation (slanted vs. vertical engine mount).
3. **Cut the CD009 bellhousing off.** Watch YouTube videos first — it's easier than it looks. Use a cutting wheel and angle grinder. Cut on the right side of the casting line per Deeworks instructions. Keep the stock bearing plate in place while cutting to prevent aluminum chips entering the transmission.
4. **Trim the input shaft 1/4".** Draw a line, cut with a cutting wheel, grind a small smooth bevel so the shaft fits easily into the pilot bushing. Put the transmission in low gear so the shaft won't rotate while cutting.
5. **Notch the bellhousing** for the hydraulic line and bleeder port. Install the AN-4 adapter on the T56 slave cylinder and mock it up to mark where material needs to be removed.
6. **Clean the transmission face** — remove all old clutch dust and gasket material.
7. **Install the input shaft seal** into the adapter plate.
8. **Bolt the adapter plate to the transmission** using the 10x M8 SHCS and single hex head bolt. Apply the included thread sealant to the 4 lower bolts — they sit below oil level and will seep without sealant.
9. **Install the T56 slave cylinder** to the adapter with the 1/8" spacer and M6 bolts. Don't fully torque yet — you'll remove it to install the adapter to the bellhousing.
10. **Install the adapter + transmission assembly to the 960 bellhousing** using the 4x M10 flanged bolts and 2x M12 hex head bolts.
11. **Press the OilLite pilot bushing** into the crankshaft end. Bevel side faces the transmission. Use a piece of wood or aluminum to drive it in without distorting the bore.
12. **Install the 850R flywheel** with ARP bolts, torqued to spec.
13. **Install the clutch disc and Sachs 765 pressure plate** using an alignment tool.
14. **Bolt the complete transmission assembly to the engine.** Verify the slave cylinder engages the pressure plate fingers correctly with proper free play.
15. **Install the shifter relocation kit.**
16. The engine + transmission assembly is now ready to go in the car.

**Swap weekend:**
1. Pull the stock engine and AW30-40 as a unit.
2. Drop in the built B6304 + CD009 as a unit.
3. Install the crossmember and transmission mount (Energy Suspension 3.1108G polyurethane mount recommended by Deeworks).
4. Install the clutch pedal assembly in the cabin.
5. Run the braided -4AN hydraulic clutch line from master cylinder to the AN-4 fitting on the slave cylinder. Fill and bleed.
6. Install the custom driveshaft. Torque all flange bolts to spec.
7. Wire the clutch safety switch and reverse lights.
8. Fill the CD009 with Nissan OEM MTF or Redline MT-90 GL-4 (~2.5–3 quarts).
9. Start the engine. Verify clutch engagement and release before moving the car.
10. Test all 6 gears and reverse in a safe area before driving on the road.
11. Finish the console and interior trim.

---

### Budget Estimate

| Item | Cost |
|---|---|
| CD009 gearbox (used, local) | $300–$600 |
| Deeworks adapter kit | $250–$400 |
| 850R flywheel (donor/eBay) | $100–$200 |
| ARP flywheel bolts | $65 |
| Sachs 765 pressure plate + clutch disc | $400–$700 |
| T56 release bearing (98–02 Camaro) | $50–$100 |
| Shifter relocation kit (GKTech/Sikky) | $150–$200 |
| Clutch master cylinder (940 donor or aftermarket) | $50–$100 |
| Braided -4AN clutch hydraulic line | $60 |
| Clutch pedal assembly (940 Turbo donor) | $50–$150 |
| Crossmember fabrication | $150–$300 |
| Energy Suspension 3.1108G trans mount | $30–$50 |
| Custom driveshaft | $300–$600 |
| Giubo + center bearing | $90–$140 |
| Clutch safety switch + wiring | $20 |
| CD009 fluid (Redline MT-90, 3 qts) | $45 |
| **Total estimate** | **$2,060–$3,730** |

Budget $2,500–$3,000 as a realistic midpoint. Significantly cheaper than the original estimate now that the adapter plate is a known off-the-shelf product from Deeworks rather than a commissioned fabrication.

---

### Key Warnings

- **CD009 variant matters.** 2007–2008 350Z HR/VHR models use a different transmission (internal slave cylinder, different bellhousing). Stick to 2003–2006 350Z or 2003–2006 G35 for the correct CD009.
- **Fluid is critical.** Use Nissan OEM MTF or Redline MT-90 GL-4. GL-5 fluid destroys the brass synchros. This is a well-documented failure mode.
- **Adapter plate precision is everything.** Input shaft misalignment causes premature bearing wear and vibration. The adapter plate must be machined to tight tolerances. Don't cut corners here.
- **Clutch pedal geometry.** After installing the master cylinder and pedal, verify the clutch fully disengages at the top of pedal travel and fully engages before the pedal hits the floor. Adjust pushrod length as needed.
- **Driveshaft balance.** A custom driveshaft should be balanced by the shop that builds it. An unbalanced shaft causes vibration that gets worse with speed and can damage the differential and transmission output bearing over time.
- **Break-in the clutch.** New clutch kits need a break-in period — typically 500 miles of moderate driving without aggressive launches or slipping. Follow the clutch manufacturer's specific break-in procedure.

---

### Parts Sources

| Item | Source |
|---|---|
| CD009 gearbox | Car-Part.com, eBay, local junkyards, Pick-n-Pull |
| Adapter kit (White Block to CD009) | **Deeworks.ca** — purpose-built for this exact swap |
| 850R flywheel | eBay, FCP Euro, Volvo 850R donor |
| Sachs 765 pressure plate + clutch disc | South Bend Clutch, Spec Clutch, ACT (specify CD009 spline) |
| T56 release bearing | 1998–2002 Camaro 5.7L donor, eBay, local GM junkyard |
| Shifter relocation | GKTech (us.gktech.com), Sikky Manufacturing |
| Braided -4AN clutch line | ISR Performance, local hydraulic shop |
| Clutch pedal assembly | 940 Turbo donor (US junkyards), eBay |
| Transmission mount | Energy Suspension 3.1108G (eBay, Amazon) |
| Driveshaft | Local driveshaft shop |
| CD009 fluid | Nissan dealer (OEM MTF), Amazon (Redline MT-90 GL-4) |
